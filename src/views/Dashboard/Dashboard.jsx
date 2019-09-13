import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import {
  LocalLibrary, Visibility,
  ArrowUpward, ArrowDownward,
} from "@material-ui/icons";
import { withStyles, Grid, Typography, Fab } from "@material-ui/core";
import Shop from '@material-ui/icons/Shop';
import {Trophy,PlaylistCheck} from "mdi-material-ui";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {translate} from "react-i18next";

//Helpers
import dashboardStyle from "../../variables/styles/dashboardStyle";
import {
  dailySalesChart,
  emailsSubscriptionChart,
} from "../../variables/charts";
import {getStats} from "../../rdx/actions/UserActions";

//Custom Componentes
import {
  StatsCard,
  ChartCard,
  ItemGrid,
  SlideCard
} from "../../components";
import ProfileUserInfo from '../../components/ProfileUserInfo/ProfileUserInfo';
import DailyNews from '../../components/DailyNews/DailyNews';
import ExpansionCard from '../../components/Cards/ExpansionCard';


class Dashboard extends React.Component {
  constructor(){
    super();

    this.state = {
      week_advance:{labels:['Sin datos'],series:[[0]]},months_advance:{labels:['Sin datos'],series:[[0]]},total_week:0,total_month:0,
      slideCardOne : false,
      certificado:false
    };
  }
  componentDidMount(){
    this.props.getStats();
  }
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  componentWillReceiveProps(props){
      if(props.stats && props.stats.months_advance){
            this.setStatsMonths(props);
      }

      if(props.stats && props.stats.week_advance){
          this.setStatsWeek(props);
      }
  }
  render() {
      console.log(process.env.PUBLIC_URL)
    const {stats,t,classes} = this.props;
    let data = {
        labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8', 'Sem 9', 'Sem 10'],
        series: [[5, 4, 3, 7, 5, 10, 3, 4, 8, 10]]
    };
    let options = {};
    let type='Bar'

    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12} align="right">
            <Fab disabled={!this.state.certificado} variant="extended" aria-label="Add" size="small" className={classes.spaceButton + " " + classes.buttonMacTheme}>
              <img src="./assets/images/icons/certIcon.svg" height="20" width="13" className={classes.spaceButtonRigth}/> {this.props.t('button_add_dashboard')}
            </Fab>
          </Grid>

          <Grid item xs={4}>
            <ProfileUserInfo></ProfileUserInfo>
          </Grid>

          <Grid item xs={8}>
            <Grid item xs={12} className='titulos'>
              <Typography variant="h4" className={classes.tittleSeccion}>
                {t('monthly_advance')}
              </Typography>
            </Grid>
            <Grid item xs={12} >
              <div className={'grafics'}>
                <ChartistGraph data={data} options={options} type={type}/>
              </div>
            </Grid>
          </Grid>
          <Grid container><ExpansionCard/></Grid>
        </Grid>

      </div>
    );
  }

  closeSlide=()=>{
    console.log("HOLA")
  }

  setStatsWeek(props){
      let days  = ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'];
      let total = 0;
      let result = {
          labels: days,
          series: []
      };

      let aux = [];
      days.forEach((value,idx)=>{
          aux[idx] = 0;

      });

      props.stats.week_advance.forEach((value)=>{
          aux[parseInt(value.day,10)-1] = {value:value.total,meta: value.total+' '+this.props.t('viewed_lessons')};
          total += parseInt(value.total,10);
      });

      result.series.push(aux);

      this.setState({week_advance:result,total_week:total});
  }

    setStatsMonths(props){
        let months  = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
        let total   = 0;

        let result = {
            labels: months,
            series: []
        };

        let aux = [];
        months.forEach((value,idx)=>{
            aux[idx] = 0;
        });

        props.stats.months_advance.forEach((value)=>{
            if(value.date.indexOf((new Date()).getFullYear()) > -1){
                aux[parseInt(value.month,10)-1] = {value:value.total,meta: value.total+' '+this.props.t('viewed_lessons')};
                total += parseInt(value.total,10);
            }

        });

        result.series.push(aux);

        this.setState({months_advance:result,total_month:total});
    }


}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

const stateToProps      = ({stats,user}) => ({stats,user});
const dispatchToProps   = (dispatch)=>({//custom props
    getStats: () => dispatch(getStats())
});

const conn = connect(stateToProps,dispatchToProps);

export default withStyles(dashboardStyle)(conn(translate("translations")(Dashboard)));
