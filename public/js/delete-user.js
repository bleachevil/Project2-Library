async function deleteUserFormHandler(event) {
    event.preventDefault();
    const user_id = document.querySelector('#userId').value;
    // window.location gives us access to the URL. We then use the .split() method to access the number at the end of the URL and set that equal to id.
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    // What part of our application will handle this 'put' request?
    // The Controller will handle this 'put' request.
    const response = await fetch(`/api/users/${user_id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        user_id
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // What happens if the response is ok?
    // If the response is ok, that means that the book was updated successfully.
    if (response.ok) {
      document.location.replace(`/login`);
    //   if (req.session.loggedIn) {
    //     req.session.destroy(() => {
    //       res.status(204).end();
    //     });
    //   } else {
    //     res.status(404).end();
    //   }
    } else {
      alert('Failed to delete');
    }
  }
  document.querySelector('.delete-user-form').addEventListener('click', deleteUserFormHandler);
  
  
  
  
  
  
  
  
  
  
  
  