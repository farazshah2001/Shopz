import React , {useEffect} from 'react'

import Item from '../home/item'
import {useGlobalContext} from '../../context'
export default function Items() {
const {fetchItems} = useGlobalContext();
const {items} = useGlobalContext();
useEffect(() => {
    fetchItems();
}, []);
console.log(items);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
         {items &&
             items.map((item)=>{
                 return(
                     <Item key={item._id} item={item} />
                 )
             })
         } 
        </div>
    )
}
