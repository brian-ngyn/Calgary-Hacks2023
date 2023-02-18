

function InstructorCard() {

	return(  
		<div className="flex flex-col shadow-md w-[350px] h-[400px] rounded-lg">
			<img className="w-[350px] h-[250px] mb-2 rounded-t-lg" src="https://i.stack.imgur.com/34AD2.jpg"/>
			<div className="px-5 w-[400px]">
				<h2 className="font-bold">Fname Lname</h2>
				<p className="text-sm font-thin">
					description description description description description description
					description description description description description description
					description description description description description description
				</p>
			</div>
		</div>
	)
}

export default InstructorCard;
