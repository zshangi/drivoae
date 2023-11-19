import {BiArrowBack} from "react-icons/bi";
import Button from '@mui/material/Button';

const Back = ({history}) => {
    return (
        <Button style={{textAlign:'left', alignItems:'left'}} onClick={() => history.goBack()}><BiArrowBack size={25} /></Button>

    )
}

export default Back