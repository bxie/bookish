import React from 'react'
import { BulletedListNode } from '../../models/Parser'
import { renderNode } from './Renderer'

export type BulletedListProps = {
    node: BulletedListNode;
}

const BulletedList = (props: BulletedListProps) => {

    return <ul>{
        props.node.items.map((item, index) =>
            item.type === "bulleted" ?
                renderNode(item, "item-" + index) :
                <li key={"item-" + index}>{renderNode(item)}</li>
        )}
    </ul>

}

export default BulletedList