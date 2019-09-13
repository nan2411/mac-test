import React,{Component} from 'react';
import {Button, Card, CardActions, CardContent, Dialog, DialogContent} from "@material-ui/core";
import {getPages, savePages} from "../../rdx/actions/diaryActions";
import {connect} from "react-redux";
import FlipPage from "react-flip-page";
import ReactDOM from 'react-dom';
import {translate} from "react-i18next";

class DiaryPages extends Component{
    constructor(){
        super();
        this.state = {pages:{},openTitle: false,openContent:false,currentPageKey:false,inputVisible:false,newPages:{}};
        this.handleCloseContent = this.handleCloseContent.bind(this);
        this.handleCloseTitle   = this.handleCloseTitle.bind(this);
        this.makePage           = this.makePage.bind(this);
        this.setCurrentPage     = this.setCurrentPage.bind(this);
    }

    componentDidMount(){
        this.props.getPages();
        this.newPageTitle = 'Elige un titulo!';
        this.newPageContent = 'Elige el contenido!';
    }


    componentWillReceiveProps(props){
        if(props.pages){
            let pages = [];

            props.pages.forEach((value,idx)=>{
                const {id,title,content} = value;
                pages[idx] = {id,title,content,isNew:false}
            });

            this.setState({pages:pages});
        }
    }

    setCurrentPage(key){
        this.setState({currentPageKey:key-1});
    }

    componentWillUnmount(){
        var pages       = [];
        let statePages  = this.state.pages;

        this.props.pages.forEach((val,idx) => {
            if(val.content !== statePages[idx].content || val.title !== statePages[idx].title){
                pages.push(statePages[idx]);
            }
        });

        statePages.forEach((value)=>{
            if(value.isNew){
                if(value.title !== this.newPageTitle && value.content !== this.newPageContent){
                    pages.push(value);
                }
            }
        });
        if(pages.length > 0){
            this.props.savePages(pages);
        }
    }

    render(){
        const {t} = this.props;
        return <Card className='diary'>
            <CardContent >
                {this.state.pages.length > 0?
                    <FlipPage orientation="horizontal" height={400}
                              className="full-width" flipOnTouch={true}
                              showTouchHint={true} onPageChange={()=>this.setCurrentPage}
                              ref={(component) => { this.flipPage = component; }}
                    >
                        {this.state.pages.map((page,key)=>{
                            return(
                            <article key={key}>
                                <h2 onClick={(ev) => this.showTitle(ev,key)} style={{color:!this.state.openTitle?'black':'white'}}>{page.title}</h2>
                                <p onClick={(ev) => this.showContent(ev,key)} className="justify" style={{display:!this.state.openContent?'block':'none'}}>{page.content}</p>
                            </article>)
                        })}
                    </FlipPage>
                    :''}

                <Dialog onClose={this.handleCloseTitle} open={this.state.openTitle}  >
                    <DialogContent className="modal-page-content title">
                        <input type="text" id="input-page-title"
                               className={`${!this.state.inputVisible?'hidden':''} input-page-title input-diary-page`}
                               style={{diplay:this.state.inputVisible?'none':'none'}}
                               value={this.state.pages !== false && this.state.currentPageKey !== false?this.state.pages[this.state.currentPageKey].title:''}
                               onChange={(ev) => this.handlePageChange(ev,'title')}/>
                    </DialogContent>
                </Dialog>

                <Dialog onClose={this.handleCloseContent} open={this.state.openContent} >
                    <DialogContent className="modal-page-content content">
                        <textarea id="input-page-content"
                                  className={`${!this.state.inputVisible?'hidden':''} input-page-content input-diary-page`}
                                  value={this.state.pages !== false && this.state.currentPageKey !== false?this.state.pages[this.state.currentPageKey].content:''}
                                  onChange={(ev) => this.handlePageChange(ev,'content')}/>
                    </DialogContent>

                </Dialog>
            </CardContent >

            <CardActions>
                <Button onClick={this.makePage} size="small" color="secondary">{t('new_page')}</Button>
            </CardActions>
        </Card>;
    }

    showTitle(ev,key){
        let target = ReactDOM.findDOMNode(ev.target).getBoundingClientRect();
        this.setState({ openTitle: true,currentPageKey:key },()=>{

            setTimeout(() => {
                let content = document.querySelector('.modal-page-content.title');
                ['top','left','width','height'].forEach((value) => {
                    let height = value === 'height'?6:0;
                    let top = value === 'top'?-3:0;

                    content.style[value]       = `${target[value]+height+top}px`;
                });
                let input = document.querySelector('.input-page-title');
                input.style['height'] = `${target['height']}px`;
                this.setState({inputVisible:true});
            },100);
        });
    }

    showContent(ev,key){
        let target = ReactDOM.findDOMNode(ev.target).getBoundingClientRect();

        this.setState({ openContent: true,currentPageKey:key },()=>{

            setTimeout(() => {
                let content = document.querySelector('.modal-page-content.content');
                ['top','left','width'].forEach((value) => {
                    let top = value === 'top'?-5:0;

                    content.style[value]       = `${target[value]+top}px`;
                });
                let input = document.querySelector('#input-page-content');
                input.style['minHeight'] = `${target['height']}px`;
                this.setState({inputVisible:true});
            },100);
        });
    }

    makePage(){

        let {pages,newPages}        = this.state;
        let newPage                 = {title:this.newPageTitle,content:this.newPageContent,isNew:true};
        newPages[newPages.length]   = newPage;
        pages[pages.length]         = newPage;

        this.setState({pages,newPages});
        let clicks = Array.from({length: this.state.pages.length-this.state.currentPageKey-1}, (x,i) => i);
        clicks.forEach(()=>{
            this.flipPage.gotoNextPage();
        })

    }

    handlePageChange(ev,type = 'content'){
        let {pages} = this.state;

        if(type === 'content'){
            pages[this.state.currentPageKey].content = ev.target.value;
        }

        if(type === 'title'){
            pages[this.state.currentPageKey].title = ev.target.value;
        }

        this.setState({pages});
    }

    handleCloseTitle(){

        this.setState({ openTitle: false, inputVisible:false});
    };

    handleCloseContent() {
        this.setState({ openContent: false, inputVisible:false});
    }
}

const stateToProps      = ({pages}) => ({pages});

const dispatchToProps   = (dispatch)=>({//custom props
    getPages: () => dispatch(getPages()),
    savePages: (pages) => dispatch(savePages(pages)),
});

const conn = connect(stateToProps,dispatchToProps);


export default conn(translate("translations")(DiaryPages));