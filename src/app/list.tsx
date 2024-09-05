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
  const [changed, setChanged] = useState(false)

  const queryClient = useQueryClient()
  useQuery({
    queryKey: ['likes'],
    queryFn: async () => {
      try {
        const likedTracks = await getLikedTracks()
        setItems(likedTracks)
        return likedTracks
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
      // queryClient.invalidateQueries({ queryKey: ['likes'] })
    },
  })

  useEffect(() => {
    console.log(items.map((i) => i.track.name))
  }, [items])

  const saveTracks = async () => {
    console.log(
      'save',
      items.map((i) => i.track.name)
    )
    // console.log(
    //   items
    //     .slice(0, 4)
    //     .map((i) => i.track.name)
    //     .reverse()
    // )
    // const ids = items.slice(0, 2).map(({ track }) => track.id).reverse()
    // await removeLikedTracks(ids)

    // for (const id of ids) {
    //   await addToLikes([id])
    //   await new Promise((r) => setTimeout(r, 100))
    // }
  }

  const moveTrack = ({
    dragIndex,
    hoverIndex,
  }: {
    dragIndex: number
    hoverIndex: number
  }) => {
    setChanged(true)
    setItems((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    )
    // const next = [...items]
    // const [removed] = items.splice(dragIndex, 1)
    // next.splice(hoverIndex, 0, removed)
    // setItems(next)
  }

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div>
          <button
            onClick={() => mutation.mutate()}
            disabled={!changed || mutation.isPending}
            className="px-4 py-2 bg-green-400 disabled:bg-green-200 disabled:cursor-not-allowed rounded mb-4 w-full cursor-pointer"
          >
            {mutation.isPending ? 'pls wait x' : 'Save'}
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
        </div>
      </DndProvider>
    </div>
  )
}
