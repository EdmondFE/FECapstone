import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    overflow: 'scroll',
    height: '62%',
    borderRadius: '20px',
    overflowX: 'hidden',
    overflowY: 'auto',
    WebkitScrollSnapType: 'scroll',
    backgroundColor: 'whitesmoke',
    paddingBottom: '0',
    [theme.breakpoints.down('sm')]: {
      width: '85%',
      height: '55%',
      overflow: 'auto',
      padding: theme.spacing(2)
    },

  },
  infoContainer: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
    padding: '25px 0',

  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingLeft: '25px',
    // width: '50%',
  },
  trySaying: {
    marginBottom: '25px',
  },
  chip: {
    margin: '5px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
}));