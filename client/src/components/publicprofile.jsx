import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import {connect} from 'react-redux';
import {Button, Modal} from 'react-bootstrap';
import styled from 'styled-components';

import PropTypes from 'prop-types';
import {  logoutUser } from "./../actions/authActions";
import Footer from './Footer.js';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';

import "./profile_pic.css";
import "./css/default.css";
import "./css/fonts.css";
import "./css/layout.css";
import "./css/magnific-popup.css";
import "./css/media-queries.css";
import en from "./i18n/en";
import cn from "./i18n/cn";
import jp from "./i18n/jp";


const Styles = styled.div
`
  .navbar { background-color: #365; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #000000;
    &:hover { color: #365; }
  }
  .carousel {
    padding-bottom: 10em;
  }
  
 
  .carousel-img {
    max-width: 1300px;
    height: auto;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #000000;
    &:hover { color: #365; }
  }
  .dropdown-center {
    position: absolute !important;
    left: 50%;
    right: 50%;
  }
  .color-nav {
      background-color : rgb(255,255,255);
  }
  .nav.nav-center {
    display: inline-block;
    left: 0;
    right: 0;
    margin:0;
    float:none;
  }
  .float-container {
    border: 3px solid #fff;
    padding: 20px;
}

.float-child {
    width: 50%;
    float: left;
    padding: 20px;
    border: 2px solid red;
} 
.education1 {
  padding: 90px 0 72px; background: #fff;
} 
`;


class PublicProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          intro:'',
          email: '',
          name: '',
          bio: '',
          skills: [],
          subjects: [],
          education: [],
          gallery: [],
          projects:[],
          website: '',
          phone: '',
          profilePicture: '',
          transcript: '',
          showAdd:false,
          showlang:false,
          showintro:false,
          showskills:'',
          showedu:false,
          showwork:false,
          showproject:false,
          showphone:false,
          lang:'en'
        };
    }

        switchtoen = () => {
  
            counterpart.setLocale('en')
            this.setState({showlang:false});
        };

        switchtocn = () => {
        counterpart.setLocale('cn');
        this.setState({showlang:false});
        };

        switchtojp= () => {
        counterpart.setLocale('jp')
        this.setState({showlang:false});
        };

        showLanguage =() => {
        this.setState({showlang:true});
        };

        hideLanguage =() => {
        this.setState({showlang:false});
        };

        componentDidMount() {
            axios
                .get('/profile1/'+(this.props.auth.user))
                .then(res=>{
                  this.setState({email:res.data[0].email,
                                 name:res.data[0].name,
                                 bio:res.data[0].bio,
                                 intro:res.data[0].intro,
                                 skills:res.data[0].skills,
                                 work:res.data[0].work,
                                 projects:res.data[0].projects,
                                 subjects:res.data[0].subjects,
                                 gallery:res.data[0].gallery,
                                 projects:res.data[0].projects,
                                 education:res.data[0].education,
                                 website:res.data[0].website,
                                 phone:res.data[0].phone,
                                 profilePicture: res.data[0].profile_picture,
                                 transcript: res.data[0].transcript,
                                 imgHash: Date.now()
                                });
                  })
            
        }


        render() {
    
      
    
            if ((this.state.email.length)===0)
            { console.log("1");
              this.componentDidMount();
              return null;
            }
          
              
                  
              return (
                <div>    
                  <header >
                  <nav id="nav-wrap" style={{backgroundColor: 'grey'}}>
                  <ul id="nav" className="nav">
                  <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
             <li><a className="smoothscroll" href="#about"><Translate content='education'></Translate> </a></li>
            <li><a className="smoothscroll" href="#skills"><Translate content='skills'></Translate> </a></li>
             <li><a className="smoothscroll" href="#projects"><Translate content='projects'></Translate> </a></li>
             <li><a className="smoothscroll" href="#subjects"><Translate content='subjects'></Translate> </a></li>
             <li><a className="smoothscroll" href="#work"><Translate content='work'></Translate> </a></li>
             <li><a className="smoothscroll" href="#" onClick={this.showLanguage}> <Translate content='language'></Translate> </a> </li>
             <Modal show={this.state.showlang} >
                  <Modal.Header closeButton onClick={this.hideLanguage}></Modal.Header>
                  <button type="button" class="block" onClick={this.switchtoen}>English</button> 
                  <button type="button" class="block" onClick={this.switchtocn}>Chinese</button> 
                  <button type="button" class="block"onClick={this.switchtojp}>Japanese</button> 
          
                
          
                
              </Modal>
             <li><a className="smoothscroll" href="" onClick={this.onLogoutClick}><Translate content='logout'></Translate> </a></li>
          </ul>
          </nav>
          
                  <div class="row banner">
                   <div class="banner-text">
                      
                      <h1 class="responsive-headline"> <Translate content='Im'></Translate>  {this.state.name} </h1>
                      <div class="float-container">
                    
                          <h3> <a class="smoothscroll" href="" float="left" width="50%"> {this.state.intro}</a></h3>
                       
                      </div>
                      
                      <hr />
                      
                   </div>
                </div>
                </header>
                <section id="about">
                <div className="row">
                <div className="three columns">
                      <img className="profile-pic"  src={this.state.profilePicture} alt="Profile Pic" />
                      <input type = "file" accept=".jpg, .png" onChange={this.fileSelectedHandler}/>
          
                   </div>
                 
                   <div className="nine columns main-col">
                      <h2><Translate content='about_me'></Translate> </h2>
          
                      <p>{this.state.bio}</p>
                          <Modal show={this.state.showbio}>
                          <Modal.Header closeButton onClick={this.hidebioModal}></Modal.Header>
                          <h2 style={{textAlign: 'center', paddingBlock:'10px',fontFamily:'Times New Roman'}}><Translate content='edit_Bio'></Translate> </h2>
                          </Modal>
                      <div className="row">
                         <div className="columns contact-details">
                            <h2><Translate content='contact_details'></Translate> </h2>
                            <p className="address">
                                     <span>{this.state.phone}</span><br />
                         <div>
                         <Button  onClick={this.showphoneModal}><Translate content='edit_phone'></Translate></Button>
                          <Modal show={this.state.showphone}>
                          <Modal.Header closeButton onClick={this.hidephoneModal}></Modal.Header>
                          <h2 style={{textAlign: 'center', paddingBlock:'10px',fontFamily:'Times New Roman'}}><Translate content='edit_Bio'></Translate> </h2>
                          <form onSubmit={this.onSubmitPhone}>
                            <input onChange={this.onChange}
                                value={this.state.addinfo}
                                
                                type="text"
                                className={("form-control")}
                                placeholder="Add Phone"
                                name="addinfo"
                        
                                maxLength="20"
                                    
                                    required autoFocus 
                              />
                            
                            <button type="submit" style={{alignContent: 'center', paddingBlock:'10px' }}> Submit</button>
                            </form>
                          </Modal>
                       
                </div>
          
                               <span>{this.state.email}</span>
                                 </p>
                         </div>
                         <div className="columns download">
                            <p>
                            <input type = "file" accept = ".pdf" onChange={this.fileSelectedHandler}/>
                            <button onClick={this.pdfUploadHandler}>Upload Transcript </button>
                            <a href = {this.state.transcript} target = "_blank" rel ="noopener noreferrer" download = "transcript">Click to Download Transcript</a>
                            
                            </p>
                         </div>
                      </div>
                   </div>
                </div>
          
             </section>
             
             <section id="education">
                <div style={{backgroundColor:'#fff'}}>
                <h2 style={{textAlign: 'center', paddingBlock:'20px',fontFamily:'Times New Roman'}}><Translate content='education'></Translate> </h2>
                <div>         
              <p   style= {{ fontSize: '20px'}}  >{ <ul style={{textAlign: 'center', paddingBlock:'20px' }}>{this.state.education.map( (item, index) =>
          <li key = {index} > 
                  <p style={{color:'black', fontFamily:'bookman', fontSize:'25px',  letterSpacing:'1px'}}>{item.school} </p>    
                  <p style={{color:'black' ,fontFamily:'librebaskerville-italic', fontSize:'20px',  letterSpacing:'1px'}}>{item.qual}</p>
                  <Button onClick={()=>{this.deleteedu((this.state.education)[index],this.props.auth.user)}}>Delete</Button>
                  <hr />
                </li>
            )}</ul>} </p>
            
                </div>
          
          
                <button style={{alignItems:'center'}} onClick={this.showEduModal}><Translate content='add_edu'></Translate> </button>
                <Modal show={this.state.showedu} >
                  <Modal.Header closeButton onClick={this.hideEduModal}></Modal.Header>
                <h2 style={{textAlign: 'center', paddingBlock:'10px',fontFamily:'Times New Roman'}}><Translate content='add_edu'></Translate> </h2>
                <form onSubmit={this.onSubmitEdu}>
                            <div className="form-group">
                              <input onChange={this.onChange}
                                value={this.state.addschoolname}
                                
                                type="text"
                                className={("form-control")}
                                placeholder="Add School Name"
                                name="addschoolname"
                                    
                                    required autoFocus 
                              />
                            </div>
                            <div className="form-group">
                              <input onChange={this.onChange}
                                value={this.state.addqual}
                                
                                type="text"
                                className={("form-control")}
                                placeholder="Add Qualification"
                                name="addqual"
                                    
                                    required autoFocus 
                              />
                            </div>
                           
                            <button type="submit" style={{alignContent: 'center', paddingBlock:'10px' }}> Submit</button>
                            </form>
          
                
                  </Modal>
               
          
          
                      
                
                </div>
          
             </section>
          
             <section id="work">
             <div style={{backgroundColor:'#fff'}}>
              <h2 style={{textAlign: 'center', paddingBlock:'10px',fontFamily:'Times New Roman'}}><Translate content='work1'></Translate> </h2>
              <div>
              <p     >{ <ul style={{textAlign: 'center', paddingBlock:'20px' }}>{((this.state.work).sort((a,b)=>b.from -a.from)).map( (item, index) =>
          <li key = {index} > 
          <div className="row education">
                   <div className="three columns header-col">
                      <h3 ><span style={{font:'Open Sans Bold' ,borderBottom: 'solid #11ABB0', letterSpacing:'1px'}}>{item.workplace}   </span></h3>
                   </div>
                   <div className="nine columns main-col">
                      <div className="row item">
                         <div className="twelve columns">
                           <div>
                  <p style={{color:'black', fontFamily:'librebaskerville-italic', fontSize:'23px'}}>{item.position} </p>
          
                  </div>
                  <div>
                  <p style={{color:'black' ,fontFamily:'librebaskerville-italic', fontSize:'23px'}}>{item.from}-{item.to}</p>
          
                  </div>
                         </div>
                      </div>
                   </div>
                <Button onClick={()=>{this.deletework((this.state.work)[index],this.props.auth.user)}}>Delete</Button>
                   </div>
          
                  
                </li>
            )}</ul>} </p>
          
              </div>
          
          
              <button style={{alignItems:'center'}} onClick={this.showWorkModal}><Translate content='add_work'></Translate> </button>
                <Modal show={this.state.showwork} >
                  <Modal.Header closeButton onClick={this.hideWorkModal}></Modal.Header>
                <h2 style={{textAlign: 'center', paddingBlock:'10px',fontFamily:'Times New Roman'}}><Translate content='add_work'></Translate> </h2>
                <form onSubmit={this.onSubmitWork}>
                            <div className="form-group">
                              <input onChange={this.onChange}
                                value={this.state.addworkplace}
                                
                                type="text"
                                className={("form-control")}
                                placeholder="Add Business Name"
                                name="addworkplace"
                                    
                                    required autoFocus 
                              />
                            </div>
                            <div className="form-group">
                              <input onChange={this.onChange}
                                value={this.state.addposition}
                                
                                type="text"
                                className={("form-control")}
                                placeholder="Add Position/Role"
                                name="addposition"
                                    
                                    required autoFocus 
                              />
                            </div>
                            <div className="form-group">
                              <input onChange={this.onChange}
                                value={this.state.addfrom}
                                
                                type="text"
                                className={("form-control")}
                                placeholder="Add Start Date"
                                name="addfrom"
                                    
                                    required autoFocus 
                              />
                            </div>
                            <div className="form-group">
                              <input onChange={this.onChange}
                                value={this.state.addto}
                                
                                type="text"
                                className={("form-control")}
                                placeholder="Add End Date"
                                name="addto"
                                    
                                    required autoFocus 
                              />
                            </div>
                            <button type="submit" style={{alignContent: 'center', paddingBlock:'10px' }}> Submit</button>
                            </form>
          
                
                  </Modal>
              </div>
          
          
             </section>
          
             <section id='projects'>
             <div style={{backgroundColor:'#fff'}}>
                <h2 style={{fontSize:'55px', textAlign: 'center', paddingBlock:'10px',fontFamily:'Times New Roman'}}><Translate content='projects'></Translate> </h2>
                <div>         
                <p > {<ul style={{textAlign: 'center', paddingBlock:'20px' }}>{(this.state.projects).map( (item, index) =>
             
            <li key = {index} >
              <div className="row education">
                   <div className="three columns header-col">
                      <h3 ><span style={{font:'Open Sans Bold' ,borderBottom: 'solid #11ABB0', letterSpacing:'1px'}}>{item.projectname}   </span></h3>
                   </div>
                   <div className="nine columns main-col">
                      <div className="row item">
                         <div className="twelve columns">
                           <div>
                  <p style={{color:'black', fontFamily:'librebaskerville-italic', fontSize:'23px'}}>{item.projectdescription} </p>
          
                  </div>
                  <div>
                  <p style={{color:'black' ,fontFamily:'librebaskerville-italic', fontSize:'23px'}}>{item.projectlink}</p>
                  </div>
                         </div>
                         <Button onClick={()=>{this.deleteproject((this.state.projects)[index],this.props.auth.user)}}>Delete</Button>
                      </div>
                   </div>
                
                   </div></li>
              )}</ul> } </p>
              </div>
              <button style={{alignItems:'center'}} onClick={this.showProjectModal}><Translate content='add_projects'></Translate> </button>
                <Modal show={this.state.showproject} >
                  <Modal.Header closeButton onClick={this.hideProjectModal}></Modal.Header>
                <h2 style={{textAlign: 'center', paddingBlock:'10px',fontFamily:'Times New Roman'}}><Translate content='add_projects'></Translate> </h2>
                <form onSubmit={this.onSubmitProject}>
                            <div className="form-group">
                              <input onChange={this.onChange}
                                value={this.state.addprojectname}
                                
                                type="text"
                                className={("form-control")}
                                placeholder="Add Project Name"
                                name="addprojectname"
                                    
                                    required autoFocus 
                              />
                            </div>
                            <div className="form-group">
                              <input onChange={this.onChange}
                                value={this.state.addprojectdescripition}
                                
                                type="text"
                                className={("form-control")}
                                placeholder="Add Project Description"
                                name="addprojectdescripition"
                                    
                                    required autoFocus 
                              />
                            </div>
                            <div className="form-group">
                              <input onChange={this.onChange}
                                value={this.state.addorijectlink}
                                
                                type="text"
                                className={("form-control")}
                                placeholder="Add Project Link"
                                name="addprojectlink"
                                    
                                    required autoFocus 
                              />
                            </div>
                            <button type="submit" style={{alignContent: 'center', paddingBlock:'10px' }}> Submit</button>
                            </form>
          
                
                  </Modal>
              </div>
          </section>
          
          
          
             <section id="skills">
                <div style={{backgroundColor:'#fff'}}>
                <h2 style={{textAlign: 'center', paddingBlock:'10px',fontFamily:'Times New Roman'}}><Translate content='skills'></Translate> </h2>
                <div>         
                <p style= {{ fontSize: '25px'}} >{<ul style={{textAlign: 'center', paddingBlock:'20px' }}>{this.state.skills.map( (item, index) =>
              <li key = {index}><span style={{color:'black' ,fontFamily:'librebaskerville-italic', fontSize:'23px',borderBottom:'solid #11ABB0'}}>{item}</span> <Button onClick={()=>{this.deleteskills(index,this.props.auth.user)}}>Delete</Button></li>
            )}</ul> } </p>
                </div>
                <button style={{alignItems:'center'}} onClick={this.showskillsModal}><Translate content='add_skills'></Translate> </button>
                
                <Modal show={this.state.showskills}>
                          <Modal.Header closeButton onClick={this.hideskillsModal}></Modal.Header>
                          <h2 style={{textAlign: 'center', paddingBlock:'10px',fontFamily:'Times New Roman'}}><Translate content='add_skills'></Translate> </h2>
                          <form onSubmit={this.onSubmitSkills}>
                            <input onChange={this.onChange}
                                value={this.state.addinfo}
                                
                                type="text"
                                className={("form-control")}
                                placeholder="Add Bio"
                                name="addinfo"
                                style={{height:'200px' }}
                                maxLength="100"
                                    
                                    required autoFocus 
                              />
                            
                            <button type="submit" style={{alignContent: 'center', paddingBlock:'10px' }}> Submit</button>
                            </form>
                          </Modal>
                      
                
                </div>
          
             </section>
             <section id="subjects">
                <div style={{backgroundColor:'#fff'}}>
                <h2 style={{fontSize:'55px', textAlign: 'center', paddingBlock:'10px',fontFamily:'Times New Roman'}}><Translate content='subjects'></Translate> </h2>
                <div>         
                <p > {<ul style={{textAlign: 'center', paddingBlock:'20px' }}>{((this.state.subjects).sort((a, b) => b.subjectyear - a.subjectyear)).map( (item, index) =>
             
            <li key = {index} >
              <div className="row education">
                   <div className="three columns header-col">
                      <h3 ><span style={{font:'Open Sans Bold' ,borderBottom: 'solid #11ABB0', letterSpacing:'1px'}}>{item.subjectname}   </span></h3>
                   </div>
                   <div className="nine columns main-col">
                      <div className="row item">
                         <div className="twelve columns">
                           <div>
                  <p style={{color:'black', fontFamily:'librebaskerville-italic', fontSize:'23px'}}>{item.subjectdescripition} </p>
          
                  </div>
                  <div>
                  <p style={{color:'black' ,fontFamily:'librebaskerville-italic', fontSize:'23px'}}>{item.subjectyear}</p>
                  </div>
                         </div>
                         <Button onClick={()=>{this.deletesubject((this.state.subjects)[index],this.props.auth.user)}}>Delete</Button>
                      </div>
                   </div>
                
                   </div></li>
              )}</ul> } </p>
                <button style={{alignItems:'center'}} onClick={this.showAddModal}><Translate content='add_subjects'></Translate> </button>
                <Modal show={this.state.showAdd} >
                  <Modal.Header closeButton onClick={this.hideAddModal}></Modal.Header>
                <h2 style={{textAlign: 'center', paddingBlock:'10px',fontFamily:'Times New Roman'}}><Translate content='add_subjects'></Translate> </h2>
                <form onSubmit={this.onSubmitSubject}>
                            <div className="form-group">
                              <input onChange={this.onChange}
                                value={this.state.addsubjectname}
                                
                                type="text"
                                className={("form-control")}
                                placeholder="Add Subject Name"
                                name="addsubjectname"
                                    
                                    required autoFocus 
                              />
                            </div>
                            <div className="form-group">
                              <input onChange={this.onChange}
                                value={this.state.addsubjectdescripition}
                                
                                type="text"
                                className={("form-control")}
                                placeholder="Add Subject Description"
                                name="addsubjectdescripition"
                                    
                                    required autoFocus 
                              />
                            </div>
                            <div className="form-group">
                              <input onChange={this.onChange}
                                value={this.state.addsubjectyear}
                                
                                type="text"
                                className={("form-control")}
                                placeholder="Add Subject Year"
                                name="addsubjectyear"
                                    
                                    required autoFocus 
                              />
                            </div>
                            <button type="submit" style={{alignContent: 'center', paddingBlock:'10px' }}> Submit</button>
                            </form>
          
                
                  </Modal>
                </div>
                      
                
                </div>
          
             </section>
          
             <section id = "gallery">
             <div style={{backgroundColor:'#fff'}}>
                <h2 style={{textAlign: 'center', paddingBlock:'10px',fontFamily:'Times New Roman'}}>Gallery</h2>
               
                  <Carousel>
                {(this.state.gallery).map( (item, index) =>
                 <Carousel.Item>
                 <img
                 className="carousel-img"
                 key={index} src={item.imagesource}
                 alt="First slide" style={{ width: '45%',
                  height: '15%',
                  display: 'block',
                  margin: 'auto'
                 }}
                 />
                 <Carousel.Caption className = "caption" style={{position: 'absolute',
              top: '80%',
              width: '45%',
              margin: 'auto',
              backgroundColor: 'whitesmoke',
              display: 'inline-block',
              borderradius: 'auto',
              textAlign: 'center',
              alignItems: 'center',
              height: '120px',
              opacity: '0.8'}}>
                 <h3> {item.description} </h3>
                 <Button onClick={()=>{this.deletegallerypic((this.state.gallery)[index],this.props.auth.user)}} > Delete Image</Button>
                   
                        </Carousel.Caption>
                  </Carousel.Item>
                )}
               </Carousel>
             
          
                  <form name="uploadForm" onkeydown="return event.key != 'Enter';">
                    <div>
                      <input type = "file" accept=".jpg, .png" onChange={this.fileSelectedHandler}/>
                    </div>
                    <div>
                      <h2> Add Photo Description </h2>
                      <input type = "text" value = {this.state.addgallerydescription} onChange = {this.handleGalleryChange}/>
                    </div>
                    <div><button type="button" onClick={this.onSubmitGalleryPhoto}>Upload Gallery </button></div>
                    </form>
                
                </div>
              </section>
                     <Footer/>
                </div>
               
              )
            }

}