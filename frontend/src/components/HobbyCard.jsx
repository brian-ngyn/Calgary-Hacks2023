function HobbyCard() {
	return (
		<div className="flex flex-col shadow-md w-[325px] h-[325px] rounded-lg text-center hover:cursor-pointer hover:bg-black/5 ease-in duration-300">
			<img className="w-[350px] h-[360px] mb-2 rounded-t-lg" src="https://newtoski.com/wp-content/uploads/2022/07/snowboard-lesson-1.jpg"/>
			<h2 className="font-black pb-2">Snowboarding</h2>
		</div>
	)
}

export default HobbyCard;
