async function deleteFormHandler(event) {
  event.preventDefault();
  const user_id = document.querySelector('#userId').value;
  // window.location gives us access to the URL. We then use the .split() method to access the number at the end of the URL and set that equal to id.
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  // What part of our application will handle this 'put' request?
  // The Controller will handle this 'put' request.
  const response = await fetch(`/${id}`, {
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
    document.location.replace(`/books/${id}`);
  } else {
    alert('Failed to edit book');
  }
}
document.querySelector('.delete-book-form').addEventListener('submit', deleteFormHandler);











