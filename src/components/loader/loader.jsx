
import loaderImage from '../../images/loader.gif';
import CircularProgress from '@mui/material/CircularProgress';
const Loader=(props)=>{
    const {isLoading,size=50,}=props
return (
isLoading && <CircularProgress size={size}></CircularProgress>
)

}
export default Loader;