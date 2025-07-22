import { Stack } from "@mui/material"
import Image1 from '../assets/image_1.jpg'
import { CustomButton } from "../customs/CustomButton"


export const Loading = ({onBack}) => {
    return (
        <>
        <Stack
            style={{
                height:"100vh"
            }}
            gap={'40px'}
            alignItems={'center'} 
            justifyContent={'center'}
                direction={'column'}>
                <img
                width={"500px"}
                src={Image1}/>
                <p 
                style={{
                    width:"85%"
                }}
                className="title">ცოტაც...</p>
            </Stack>
        </>
    )
}