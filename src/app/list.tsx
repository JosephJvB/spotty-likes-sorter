'use client'
import { ISpotifyPlaylistTrack } from 'jvb-spotty-models'
import { Track } from './track'
import { useEffect, useState } from 'react'
import update from 'immutability-helper'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addToLikes, getLikedTracks, removeLikedTracks } from './spotifyClient'

export const List: React.FC = () => {
  const [items, setItems] = useState<ISpotifyPlaylistTrack[]>([])
  const [nextUrl, setNextUrl] = useState<string | undefined>()
  const [saveIdx, setSaveIdx] = useState<number>(1)
  const [orderedList, setOrderedList] = useState<string[]>([])

  const queryClient = useQueryClient()
  const query = useQuery({
    queryKey: ['likes'],
    queryFn: async () => {
      try {
        const { tracks, next } = await getLikedTracks(nextUrl)
        setItems(items.concat(tracks))
        setOrderedList([...orderedList, ...tracks.map(({ track }) => track.id)])
        setNextUrl(next)
        return tracks
      } catch (error) {
        console.error(error)
        return []
      }
    },
  })

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        await saveTracks()
      } catch (error) {
        console.error(error)
      }
    },
    onSuccess: () => {
      setNextUrl(undefined)
      queryClient.invalidateQueries({ queryKey: ['likes'] })
    },
  })

  const saveTracks = async () => {
    const ids = items.map(({ track }) => track.id)
    await removeLikedTracks(ids)

    /**
     * had annoying ordering issue
     * so just add tracks one by one
     * even had ordering issues with 700ms
     * feel like im taking crazy pills
     */
    for (const id of ids.reverse()) {
      await addToLikes([id])
      await new Promise((r) => setTimeout(r, 1000))
      setSaveIdx((i) => i + 1)
    }
    setSaveIdx(1)
  }

  const moveTrack = ({
    dragIndex,
    hoverIndex,
  }: {
    dragIndex: number
    hoverIndex: number
  }) => {
    setItems((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    )
  }

  const loadDisabled = query.isLoading || mutation.isPending
  const listHasChanged =
    items.map(({ track }) => track.id).join(',') !== orderedList.join(',')
  const saveDisabled = !listHasChanged || mutation.isPending

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div>
          <button
            onClick={() => mutation.mutate()}
            disabled={saveDisabled}
            className="px-4 py-2 bg-green-400 disabled:bg-green-200 disabled:cursor-not-allowed rounded mb-4 w-full cursor-pointer"
          >
            {query.isPending && 'pls wait x'}
            {mutation.isPending && `saving ${saveIdx} / ${items.length}`}
            {!query.isPending &&
              !mutation.isPending &&
              `Save ${items.length} tracks`}
          </button>
          <div className="flex flex-col gap-2">
            {items.map(({ track }, idx) => {
              return (
                <Track
                  key={track.id}
                  track={track}
                  index={idx}
                  moveTrack={moveTrack}
                />
              )
            })}
          </div>
          {!query.isLoading && (
            <button
              className="px-4 py-2 bg-green-300 disabled:bg-green-200 disabled:cursor-not-allowed rounded mb-4 w-full cursor-pointer"
              disabled={loadDisabled}
              onClick={() => query.refetch()}
            >
              {loadDisabled ? 'pls wait x' : 'Load more'}
            </button>
          )}
        </div>
      </DndProvider>
    </div>
  )
}
