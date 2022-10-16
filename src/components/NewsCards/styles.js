import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme)=> ({
    container:{
        padding: '0 5%',
        width: '100%',
        margin: '0',
    },
    card:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '53vh',
        padding: '10%',
        borderRadius: 10,
        color: 'black',
        position: 'relative',
        isolation: 'isolate',
        paddingTop: 0,
        backgroundColor: 'whitesmoke',
        [theme.breakpoints.down('sm')]: {
          justifyContent: 'none',
          height: '50vh',
        },
    },
    infoCard:{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center', 
      
    },
    logoContainer: {
        padding: '0 5%',
        textAlign: 'left',
        width: '100%',
        
        lineHeight: '1',
        marginTop: '10px',
        zIndex: '-1',
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column-reverse',
          textAlign: 'left',
          margin: '10 0 0 0',
        },
    },
    logo: {
        height: '27vmin',
        borderRadius: '20%',
        padding: '0 5%',
        margin: '3% 0',
        [theme.breakpoints.down('sm')]: {
          height: '35vmin',
        },
    },
    logoTitle: {
        fontSize: '5rem',
        marginBottom: '10px',
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
          fontSize: '3rem',
        }
    },
    subTitle:{
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
      }
    },
    typography: {
      letterSpacing: '2px',
      fontFamily: 'TypeMachine',
      color: 'white',
      fontWeight: '800',
     
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.7rem',
      }
    },
    infoDescp: {
      letterSpacing: '2px',
      fontFamily: 'TypeMachine',
      fontSize: '1rem',
      [theme.breakpoints.down('md')]: {
        fontSize: '1rem',
       
      },
    },
    iconMic:{
      verticalAlign: 'text-bottom',
      [theme.breakpoints.down('sm')]: {
        fontSize: '2rem',
        verticalAlign: 'middle',
      }
    },
    media:{
      height: '17vh',
      position:'absolute',
      width:'100%',
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '10px',
      opacity: '0.9',
      backgroundColor: '#181818',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      borderBottom: '5px solid #454545',
    }
   
}))

