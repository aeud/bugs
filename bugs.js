(function(){
    var tracker = $('<div>').attr('id', 'bugTracker');
    function newModal(title, body, footer, size){
        var size = size || 'lg';
        var modal = $('<div>').attr('class', 'modal fade');
        var modalDialog = $('<div>').attr('class', 'modal-dialog').addClass('modal-' + size);
        var modalContent = $('<div>').attr('class', 'modal-content');
        var modalHeader = $('<div>').attr('class', 'modal-header');
        var closeButton = $('<button>').attr('class', 'close').attr('aria-label', 'Close').attr('data-dismiss', 'modal').append($('<span>').attr('aria-hidden', 'true').html('&times;'));
        var modalTitle = $('<h4>').attr('class', 'modal-title').html(title);
        var modalBody = $('<div>').attr('class', 'modal-body').append(body);
        modalHeader.append(closeButton);
        modalHeader.append(modalTitle);
        modalContent.append(modalHeader);
        modalContent.append(modalBody);
        if (typeof footer != 'undefined' && footer) {
            var modalFooter = $('<div>').attr('class', 'modal-footer').append(footer);
            modalContent.append(modalFooter);
        }
        modalDialog.append(modalContent);
        modal.append(modalDialog);
        modal.modal();
        return modal;
    }
    function label(l) {
        return $('<label>').attr('class', 'col-sm-2 control-label').html(l);
    }
    function textarea(id) {
        return $('<div>').attr('class', 'col-sm-10').append($('<textarea>').attr('class', 'form-control').attr('id', 'bugTracker_' + id));
    }
    var body = $('<form>').attr('class', 'form-horizontal');
    body.append($('<div>').attr('class', 'form-group').append(label('Description')).append(textarea('description')));
    var sendButton = $('<button>').attr('class', 'btn btn-primary').html('Send');
    var footer = $('<div>').append(sendButton);
    var modal;
    tracker.click(function(){
        modal = newModal('Report a bug', body, footer);
    });
    $('body').append(tracker);
    sendButton.click(function(){
        $.ajax({
            url: 'https://docs.google.com/forms/d/1Jy7saD8MHAaUL523IvrZ99KiQXPygRfF60dWlqg-ye8/formResponse',
            data: {
                'entry.1541752088': new Date(),
                'entry.1193722962': window.location.href,
                'entry.528450630': document.referrer || 'N/A',
                'entry.147700338': navigator.userAgent,
                'entry.233948447': $('#bugTracker_description').val(),
            },
            'type': 'post',
            'dataType': 'xml',
            success: function(){
                modal.modal('hide');
            }
        });
    })
})();