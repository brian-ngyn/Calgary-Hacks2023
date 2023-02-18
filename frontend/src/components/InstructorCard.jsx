

function InstructorCard({firstName, lastName, imageUrl}) {
	return(  
		<div className="flex flex-col shadow-md w-[350px] h-[350px] rounded-lg justify-center items-center text-center hover:cursor-pointer hover:bg-black/5 ease-in duration-300">
			<img className="w-[150px] h-[150px] rounded-full mb-10" src={imageUrl}/>
			<div className="px-5 w-[400px]">
				<h2 className="font-normal text-4xl">{firstName} {lastName}</h2>
			</div>
		</div>
	)
}

export default InstructorCard;
