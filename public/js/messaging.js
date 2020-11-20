
  messaging.onMessage(function (payload) {
    console.log(payload);
    const notificationOption={
        body:payload.notification.body,
        icon:payload.notification.icon
    };
    if(Notification.permission==="granted"){
      var notification=new Notification(payload.notification.title,notificationOption);
  
      notification.onclick=function (ev) {
          ev.preventDefault();
          window.open(payload.notification.click_action,'_blank');
          notification.close();
      }
  }
  });
  
  
