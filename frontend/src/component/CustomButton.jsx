import {Button} from '@mui/material';

export default function CustomButton(props) {
    return (
        <Button
            variant="contained"
            {...props}
            sx={{
                width: 1,
                backgroundColor: '#DA63A5',
                borderRadius: {xs: 4, sm: 5, md: 5},
                height: {xs: '55px', sm: '67px'},
                fontWeight: 'bold',
                fontSize: {xs: '18px', sm: '24px', md: '24px'},
                textTransform: 'none',
                mb: 8,
            }}
        />
    )
}