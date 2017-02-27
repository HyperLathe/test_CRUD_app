var update = document.getElementById('update'),
    del = document.getElementById('delete');

// TRIGGER THE BAR REPLACING FOO 
update.addEventListener('click', function() {
    fetch('quotes', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'name': 'Bar',
                'quote': 'Replacement entry'
            })
        })
        .then(res => {
            if (res.ok) return res.json();
        })
        .then(data => {
            console.log(data);
            window.location.reload(true);
        });

});

// TRIGGER THE FIRST BAR DELETE
del.addEventListener('click', function() {
    fetch('quotes', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({	'name': 'Bar' })
        })
        .then(res => {
            if (res.ok) return res.json();
        })
        .then(data => {
            console.log(data);
            window.location.reload(true);
        });
});
