import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {Para, TitleDiv} from './ListComponent.style';
const useStyles = makeStyles({
    sideImages: {
        position: 'relative',
        top: '12px'
    },
  });

const ListComponent = (props) => {
    const classes = useStyles();
    return (
        <Grid
        direction="column"
        alignItems="flex-end">
            <Grid item className={classes.sideImages}>
                <img src={process.env.PUBLIC_URL + '/images/flowcharts/learn_button_setting_selected.png'} 
                    alt="pic" width="70" onClick={props.show}/>
            </Grid>
            <Grid item className={classes.sideImages}>
                <img src={process.env.PUBLIC_URL + '/images/flowcharts/learn_button_remote.png'} 
                    alt="pic" width="70" onClick={props.show}/>
            </Grid>
            <Grid item className={classes.sideImages}>
                <img src={process.env.PUBLIC_URL + '/images/flowcharts/learn_button_music.png'} 
                    alt="pic" width="70" onClick={props.show}/>
            </Grid>
            <Grid item className={classes.sideImages}>
                <img src={process.env.PUBLIC_URL + '/images/flowcharts/learn_button_image.png'} 
                    alt="pic" width="70" onClick={props.show}/>
            </Grid>
            <Grid item className={classes.sideImages}>
                <img src={process.env.PUBLIC_URL + '/images/flowcharts/learn_button_plotter.png'} 
                    alt="pic" width="70" onClick={props.show}/>
            </Grid>
            <Grid item className={classes.sideImages}>
                <img src={process.env.PUBLIC_URL + '/images/flowcharts/learn_button_speech.png'} 
                    alt="pic" width="70" onClick={props.show}/>
            </Grid>
            <Grid item className={classes.sideImages}>
                <img src={process.env.PUBLIC_URL + '/images/flowcharts/learn_button_update.png'} 
                    alt="pic" width="70" onClick={props.show}/>
            </Grid>
            <TitleDiv>
                <Para>Remote</Para>
               
              
                <Para>Music Player</Para>
                
              
                <Para>Image Processing</Para>
                
            
                <Para>Plotter</Para>
               
              
                <Para>Speech</Para>
              
                
                <Para>Update</Para>
            </TitleDiv>
        </Grid>
    );
}

export default ListComponent;
