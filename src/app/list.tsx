'use client'
import { ISpotifyPlaylistTrack } from 'jvb-spotty-models'
import { Track } from './track'
import { useState } from 'react'
import update from 'immutability-helper'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const List: React.FC<{
  initialItems: ISpotifyPlaylistTrack[]
}> = (props) => {
  const [items, setItems] = useState<ISpotifyPlaylistTrack[]>(
    props.initialItems
  )
  const [changed, setChanged] = useState(false)

  const saveTracks = () => {
    /**
     * delete liked songs
     * then re-add liked songs in new order
     */
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
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <button
          disabled={!changed}
          className='px-4 py-2 bg-green-400 disabled:bg-green-200 disabled:cursor-not-allowed rounded mb-4 w-full cursor-pointer'
        >
          Save
        </button>
        <div className='flex flex-col gap-2'>
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
  )
}
