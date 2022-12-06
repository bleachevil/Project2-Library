const dashboard = async () => {
    const response = await fetch('/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/users');
    } else {
      alert('Failed to log out.');
    }
  };
  
  document.querySelector('#Userpage').addEventListener('click', dashboard);