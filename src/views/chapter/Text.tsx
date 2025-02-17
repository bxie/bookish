import React, { useContext } from 'react'
import { TextNode } from '../../models/Parser';
import { ChapterContext } from './Chapter';

const Text = (props: { node: TextNode}) => {

    const { node } = props
    const context = useContext(ChapterContext)

    // Is there a query we're supposed to highlight? If so, highlight it.
    if(context && context.highlightedWord) {
        const query = context.highlightedWord;
        const text = node.text;
        const lowerText = text.toLowerCase();
        // Does this text contain the query? Highlight it.
        if(lowerText.indexOf(query) >= 0) {

            // Find all the matches
            const indices = [];
            for(let i = 0; i < text.length; ++i) {
                if (lowerText.substring(i, i + query.length) === query) {
                    indices.push(i);
                }
            }

            // Go through each one and construct contents for the span to return.
            const segments = [];
            for(let i = 0; i < indices.length; i++) {
                // Push the text from the end of the last match or the start of the string.
                segments.push(text.substring(i === 0 ? 0 : indices[i - 1] + query.length, indices[i]));
                segments.push(<span key={"match-" + i} className="bookish-text bookish-content-highlight">{text.substring(indices[i], indices[i] + query.length)}</span>);
            }
            if(indices[indices.length - 1] < text.length - 1)
                segments.push(text.substring(indices[indices.length - 1] + query.length, text.length));

            return <span>{segments}</span>;

        }
        else return <span>{node.text}</span>;

    } 
    // Otherwise, just return the text as a span with metadata.
    else return <span className="bookish-text" data-position={node.position}>{node.text}</span>;

}

export default Text