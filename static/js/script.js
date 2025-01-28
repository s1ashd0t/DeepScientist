function research(){
    fetch('/api/data')
            .then(response => response.json())
            .then(data => {
                document.getElementById('data').innerHTML = JSON.stringify(data);
            });
}

