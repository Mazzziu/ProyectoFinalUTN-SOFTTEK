import React from "react";
import {
    Stack,
    Card,
    CardContent,
    CardActions,
    Typography,
    Avatar,
    Chip,
    Button,
} from "@mui/material";

import moment from "moment";

const CardOrder = ({ order, onComplete }) => {
    let { mesa, items, complete, total, date } = order;
    moment.updateLocale("en", {
        relativeTime: {
            future: "dentro de %s",
            past: "hace %s",
            s: "un segundo",
            ss: "%d seconds",
            m: "un minuto",
            mm: "%d minutos",
            h: "una hora",
            hh: "%d horas",
            d: "un dia",
            dd: "%d dias",
            w: "una semana",
            ww: "%d semanas",
            M: "un mes",
            MM: "%d meses",
            y: "un año",
            yy: "%d años",
        },
    });
    return (
        <Card key={order._id} sx={{ p: "1rem" }}>
            <CardContent>
                <Stack gap={4}>
                    <Stack direction='row' justifyContent='space-around'>
                        <Typography variant='h5' color='initial'>
                            Mesa #{mesa}
                        </Typography>
                        <Chip
                            label={complete ? "Completada" : "Incompleta"}
                            color={complete ? "success" : "warning"}
                            variant='outlined'
                        />
                        <Typography variant='h5' color='initial'>
                            Creada {moment(date).fromNow()}
                        </Typography>
                    </Stack>

                    {items.map((item) => (
                        <Stack key={item._id} direction='row' gap={2}>
                            <Avatar>{item.qty}</Avatar>
                            <Avatar
                                alt='imagen producto'
                                src={item.productId.img}
                            />
                            <Stack>
                                <Typography variant='body1' color='initial'>
                                    {item.productId.name}
                                </Typography>
                                <Typography variant='body2' color='initial'>
                                    {item.productId.description}
                                </Typography>
                            </Stack>
                            <Typography variant='body1' color='initial'>
                                {item.productId.price}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
            </CardContent>
            <CardActions>
                <Stack
                    width='100%'
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <Typography variant='body1' color='initial'>
                        Total ${total}
                    </Typography>
                    <Button
                        variant='contained'
                        color='success'
                        onClick={onComplete}
                    >
                        Completar
                    </Button>
                </Stack>
            </CardActions>
        </Card>
    );
};

export default CardOrder;
