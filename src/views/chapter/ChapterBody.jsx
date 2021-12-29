import React from 'react'
import { renderNode } from './Renderer'

function ChapterBody(props) {

    const { node, context } = props
    const errors = node.metadata.errors

    return <div key="chapter" className="chapter-body">
        {
            errors.length === 0 ? 
                null : 
                <p>
                    <span className="alert alert-danger">{errors.length + " " + (errors.length > 1 ? "errors" : "error")} below</span>
                </p>
        }
        { node.blocks.map((block, index) => renderNode(block, context, "block-" + index)) }
    </div>

}

export default ChapterBody