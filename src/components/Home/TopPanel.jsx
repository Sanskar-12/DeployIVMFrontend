import searchLogo from '../../assets/search.svg'

export default function TopPanel(){
    return (
    <div className='invisible w-0 h-0 md:h-fit md:w-full md:visible flex justify-between'>
        <div className='text-2xl font-semibold'>Dashboard</div>
        <div className="justify-end flex gap-8">
            <div className='py-1 px-2 rounded-xl bg-white flex text-gray-400 gap-32'>
                <div>Search...</div>
                <img src={searchLogo}/>
            </div>
            
        </div>
    </div>
    )
}