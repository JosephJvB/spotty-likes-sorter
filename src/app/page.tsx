'use client'
import { ISpotifyPlaylistTrack, ISpotifyTrack } from 'jvb-spotty-models'
import { TestLikes } from './data'
import { useRef, useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import type { Identifier, XYCoord } from 'dnd-core'
import update from 'immutability-helper'
import { HTML5Backend } from 'react-dnd-html5-backend'

/**
 *
 * TODO: initial render on server
 */

type DragItem = {
  index: number
  id: string
  type: string
}

/**
 * https://github.com/react-dnd/react-dnd/blob/main/packages/examples/src/04-sortable/simple/Card.tsx
 */
const Track = (props: {
  track: ISpotifyTrack
  index: number
  moveTrack: (args: { dragIndex: number; hoverIndex: number }) => void
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'track',
    collect: (monitor) => ({ handlerId: monitor.getHandlerId() }),
    hover: (item: DragItem, monitor) => {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = props.index
      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      props.moveTrack({ dragIndex, hoverIndex })

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'track',
    item: () => ({
      id: props.track.id,
      index: props.index,
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0 : 1,
      }}
      className='border border-solid border-black select-none'
      data-handler-id={handlerId}
    >
      {props.track.name}
    </div>
  )
}

export default function Home() {
  const [items, setItems] = useState<ISpotifyPlaylistTrack[]>(TestLikes)

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

  return (
    <DndProvider backend={HTML5Backend}>
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <div>
          <h1>Spotify Likes</h1>
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
      </main>
    </DndProvider>
  )
}
