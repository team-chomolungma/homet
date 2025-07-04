import {Stack, Typography} from '@mui/material';

export default function Timeline({displayname}) {

    return (
        <>
            <Stack
                alignItems="center"
                direction="row"
                spacing={3}
                sx={{margin: 2}}
            >
                <Typography sx={{
                    fontSize: 14,
                    bgcolor: '#D8F3DC',
                    borderRadius: '50%',
                    padding: 1
                }}>{displayname.toString().slice(0, 1)}</Typography>
                <Typography sx={{fontSize: 14}}>{displayname}</Typography>
            </Stack>
        </>
    )

}