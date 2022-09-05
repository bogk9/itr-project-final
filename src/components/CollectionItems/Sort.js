import React from 'react';

export const Sort = ({children, ascending}) => {
    const compare = (a, b) => {
        if(ascending){
            return a.props.children.props.itemData.name.toLowerCase().localeCompare(b.props.children.props.itemData.name)
        }
        else{
            b.props.children.props.itemData.name.toLowerCase().localeCompare(a.props.children.props.itemData.name)
        }
    }

    return React.Children.toArray(children).sort(compare)
}