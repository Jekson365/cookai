import { Stack } from "@mui/material"
import Image1 from '../assets/image_3.png'
import { CustomButton } from "../customs/CustomButton"

export const Intro = ({onNext}) => {
    return  (
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
                className="title">აღარ გსურთ ფიქრი იმაზე, რა მოამზადოთ? უბრალოდ ჩაწერეთ პროდუქტი, რაც გაქვთ სახლში, და ჩვენი ჭკვიანი AI მიგითითებთ გემრიელ რეცეპტებს, რომლებიც შეგიძლიათ სწორედ ახლა მოამზადოთ!</p>
                <div onClick={onNext}>
                <CustomButton title={"დაწყება"}/>
                </div>
            </Stack>
        </>
    )
}