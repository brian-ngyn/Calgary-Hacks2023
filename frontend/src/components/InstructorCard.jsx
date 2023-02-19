import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoopIcon from '@mui/icons-material/Loop';
import { useUserAuth } from "../authentication/UserAuthContext";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Button } from "@mui/material";

const SWAP_ICON = {color: "#F7F7F7"}
function InstructorCard( props ) {
	const [swap, setSwap] = useState(false);
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const data = props.data;
	const { docSnap } = useUserAuth();
	console.log(data)

	const handleClose = () => {
		setOpen(false);
	}

	const handleClick = () => {
		setOpen(true)
	}

	const selectSkill = (skill) => {
		console.log(skill);
		navigate("/portfolio/" + data.id, { state: data });
	}

	useEffect(() => {
		if (docSnap){
			data.portfolio.map((curr_portfolio, idx) => {
				if (docSnap.interests.includes(curr_portfolio.skill)) {
					setSwap(true);
				}
			})
			docSnap.portfolio.map((curr_portfolio, idx) => {
				if (data.interests.includes(curr_portfolio.skill)) {
					setSwap(true);
				}
			})
		}
	}, []);

	return(  
		<div>

			<div
				className="shadow-md flex flex-col w-[250px] h-[250px] rounded-lg justify-center items-center text-center hover:cursor-pointer hover:bg-black/5 ease-in duration-300 static font-body"
				onClick={() => handleClick()}
			>
				{swap && 
				
				<div className="bg-accent w-8 h-8 rounded-full self-end flex justify-center items-center relative top-0 right-2">
					<LoopIcon sx={SWAP_ICON}/>
				</div>
				
				}
				<img className="w-[100px] h-[100px] rounded-full mb-4" src={data.photoUrl}/>
				<div className="px-5 w-60">
					<h2 className="font-header text-2xl mb-1" >{data.fName} {data.lName}</h2>
					<ul className="flex flex-wrap gap-2 justify-items-start justify-center">
						{data.interests.slice(0, 3).map((data, index) => {
							return(
								<li key={index} className="text-sm font-thin bg-accent/10 rounded-full h-5 px-2 text-accent">{data}</li>
							)
						})}
					</ul>
				</div>
			</div>
			<Dialog
				open={open}
				onClose={handleClose}
			>
				<DialogContent>
					<div className="p-4 text-center flex flex-col gap-4">
						<div className="font-header">
							Select a skill to learn from {data.fName}
						</div>
						<ul className="flex flex-wrap gap-2 justify-items-start justify-center">
							{data.interests.map((data, index) => {
								return(
									<li key={index} className="text-sm bg-accent/10 rounded-full h-5 px-2 text-accent hover:cursor-pointer" onClick={()=>selectSkill(data)}>{data}</li>
								)
							})}
						</ul>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default InstructorCard;
