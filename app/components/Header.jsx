import React, { Component } from 'react';
import { Navbar, NavItem, Icon, Switch } from 'react-materialize';

class Header extends Component {

  getUserLocation() {
    return '123 Lake St. Sydney';
    //NEED OF AN API_KEY
    // if(navigator.geolocation) {
    //   /* Chrome need SSL! */
    //   let is_chrome = /chrom(e|ium)/.test( navigator.userAgent.toLowerCase() );
    //   let is_ssl    = 'https:' == document.location.protocol;
    //   if( is_chrome && ! is_ssl ){
    //       return false;
    //   }
    //   navigator.geolocation.getCurrentPosition(function(position) {
    //     let lat = position.coords.latitude;
    //     let lng = position.coords.longitude;
    //     let google_map_position = new google.maps.LatLng( lat, lng );
    //     google_maps_geocoder = new google.maps.Geocoder();
    //             google_maps_geocoder.geocode(
    //                 { 'latLng': google_map_pos },
    //                 function( results, status ) {
    //                     if ( status == google.maps.GeocoderStatus.OK && results[0] ) {
    //                         console.log( results[0].formatted_address );
    //                         return results[0].formatted_address;
    //                     }
    //                 }
    //             );
    //   }, function() {
    //     return 'No Address';
    //   });
    // } else {
    //   return 'No Address';
    // }

  }

  render() {
    return(
      <div className="section site_header">
        <Navbar brand={<a href="/"><div className="main_brand">
          <img className="main_brand_logo" src="./assets/images/Logo.png"/>
          <p className="main_brand_title">La Pizza</p></div></a>} alignLinks="right">
          <NavItem className="brand_logo">
            <div className="btn_brand_logo">
              <img className="btn_brand_logo_img" src="./assets/images/Logo.png"/>
            </div>
            <p className="btn_brand_title">La Pizza</p>
          </NavItem>
          <NavItem className="btn_display_account">
            <Icon className="tag_name">
              account_circle
            </Icon>
            <div className="account_details">
              <div className="account_row user" href="#"><Icon left>person</Icon><p>Name</p></div>
              <div className="account_row loc" href="#"><Icon className="pin_drop" left>pin_drop</Icon><i className="location_name">{ this.getUserLocation() }</i></div>
              <div className="account_row logout" href="#"><Icon className="lock" left>lock</Icon><p className="logout">Logout</p></div>
            </div>
          </NavItem>
          <NavItem className="btn_display_site_settings">
            <Icon className="tag_settings">
              settings
            </Icon>
            <div className="setting_details">
              <div className="setting_row blackTheme" href="#"><Switch offLabel="" onLabel="" onChange={function(){ alert('Click');}}/><p>Dark Theme</p></div>
            </div>
          </NavItem>
        </Navbar>
      </div>
    );
  }

}


export default Header;
