import { useContext, useEffect, useRef, useState } from "react"
import html2canvas from "html2canvas";

import { Box, Grid, Stack, Typography } from "@mui/material"
import { ResultContext } from "../App"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { motion, AnimatePresence } from "framer-motion"
import SaveAltIcon from '@mui/icons-material/SaveAlt';

export const Result = () => {
     const screenshotRef = useRef();
    const [resPage, setResPage] = useState(false)
    const [currentRes, setCurrentRes] = useState()
    const { result } = useContext(ResultContext)

    const handleCurrentRec = (name) => {
        setResPage(true)
        const c = result.find((e) => e.name === name)
        setCurrentRes(c)
    }

    useEffect(() => {
        console.log(currentRes)
    }, [currentRes])

     const handleScreenshot = () => {
    if (!screenshotRef.current) return;
    html2canvas(screenshotRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "screenshot.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

    return (
        <AnimatePresence mode="wait">
            {!resPage ? (
                <motion.div
                    key="list"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4 }}
                >
                    <Box
                     
                        style={{
                            display: "flex",
                            height: "100vh",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Grid container justifyContent={'center'} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            {result && result.map((e, index) => (
                                <Grid key={index} item xs={6}>
                                    <Box
                                        onClick={() => handleCurrentRec(e.name)}
                                        p={2} className="result-box"
                                    >
                                        <Stack direction={'column'} alignItems={'flex-start'} gap={'10px'}>
                                            <Typography>{e.name}</Typography>
                                            <Typography>{e.cook_time}</Typography>
                                        </Stack>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </motion.div>
            ) : (
                <motion.div
                    key="detail"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4 }}
                >
                    <Box
                        ref={screenshotRef}
                        style={{
                            display: "flex",
                            height: "100vh",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        
                        <Stack
                            direction={"column"}
                            alignItems={"flex-start"}
                            gap={"20px"}
                        >

                            <div
                                className="go-back"
                                onClick={() => setResPage(false)}
                            >
                                <ArrowBackIosIcon
                                    style={{
                                        transform: "translateX(5px)"
                                    }}
                                />
                            </div>
                            {currentRes && (<>
                                <div style={{ fontWeight: "bold" }}>ინგრედიენტები:</div>
                                <Stack direction={'row'} gap={'5px'}>
                                    {currentRes.ingredients.map((i, idx) => (
                                        <Box key={idx}>{i} ,</Box>
                                    ))}
                                </Stack>

                                <div style={{ fontWeight: "bold" }}>ინსტრუქცია:</div>
                                <Stack
                                    direction={'column'}
                                    gap={'10px'}
                                    alignItems={'flex-start'}
                                >
                                    {currentRes.instructions.map((i, idx) => (
                                        <li key={idx}>{i}</li>
                                    ))}
                                </Stack>
                            </>)}
                             <div className="go-back" onClick={handleScreenshot}>
                                    <SaveAltIcon/>
                             </div>
                        </Stack>
                    </Box>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
