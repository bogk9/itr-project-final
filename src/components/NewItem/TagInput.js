import { useState, useEffect } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

export const TagInput = (props) => {
    const [fetchedTags, setFetchedTags] = useState([
        { id: 'Turkey', text: 'Turkey' }
      ]);


    const handleAddition = (e) => {
        props.setTags([...props.tags, e]);
    }

    const handleDelete = i => {
        props.setTags(props.tags.filter((tag, index) => index !== i));
    };

    useEffect(() => {
         props.loadFields("tags")
        .then(response => setFetchedTags(response.map(tag => {return {id: String(tag.id), text: tag.name}})));
    }, [])


    return(
        <ReactTags suggestions={fetchedTags} tags={props.tags.map(tag => {if(tag.id) return tag; else return {id: String(tag.tag_id), text: tag.tag.name}})} handleAddition={handleAddition} handleDelete={handleDelete} />
    )


}