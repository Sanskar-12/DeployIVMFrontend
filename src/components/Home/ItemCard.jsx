 const ItemCard=({name,icon,val,deco})=>{
    return (
        <div className={deco}>
            <div className="flex justify-end "><img className="w-7 h-7"  src={icon} /></div>
            <div>
                <div>{name}</div>
                <div className="text-xl font-bold">{val}</div>
            </div>
        </div>
    )
}

export default ItemCard