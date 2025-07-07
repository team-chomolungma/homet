import {Stack, Typography} from '@mui/material';

export default function UserIcon({displayname}) {

    return (
        <>
            <Stack
                alignItems="center"
                direction="row"
                spacing={1}
                sx={{margin: 2}}
            >
                <Typography sx={{
                    fontSize: 14,
                    bgcolor: '#D8F3DC',
                    color: '#333',
                    borderRadius: '50%',
                    padding: 1,
                    width: 20,
                    height: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                }}>{displayname.toString().slice(0, 1)}</Typography>
                <Typography sx={{fontSize: 14}}>{displayname}</Typography>
            </Stack>
        </>
    )

}