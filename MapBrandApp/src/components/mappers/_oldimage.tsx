// function checkIfImageExists(url, callback) {
  //   const img = new Image();
  //   img.src = url;

  //   if (img.complete) {
  //     callback(true);
  //   } else {
  //     img.onload = () => {
  //       callback(true);
  //     };
      
  //     img.onerror = () => {
  //       callback(false);
  //     };
  //   }
  // }

  // function CheckImage(path) {
  //   axios
  //     .get(path,{
  //       auth: {
  //         username: 'csvuniverskate',
  //         password: 'UdQ4SKATE7PytND'
  //       },
  //       headers: {'X-Requested-With': 'XMLHttpRequest'},
  //       withCredentials: false, 
  //     })
  //     .then(() => {
  //       return path;
  //     })
  //     .catch(() => {
  //       return "false";
  //     });
  // }

  // let imagesSeba = [];
  // let urlImages = null;

  // useEffect(() => {
  //   for (let value of Object.values(SEBA_PRODUCTS)) {
  //     value.map(item => {
  //       urlImages = item.image;
  //       checkIfImageExists(urlImages, (exists) => {
  //         if (exists) {
  //           // Success code
  //           imagesSeba.push(urlImages)
  //         } else {
  //           // Fail code
  //           console.log('No');
  //         }
  //       });
  //     })
  //   }
  // }, []);