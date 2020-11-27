;(function ($) {
  'use strict'

  $(function () {
    console.log('Dashboard - Firebase Trigger Functions')

    const customFuncBtn = $('#firebase-trigger-functions')

    customFuncBtn.on('click', (e) => {
      const url = customFuncBtn.data('url')
      customFuncBtn.prop('disabled', true)

      const settings = {
        url,
        method: 'POST',
        timeout: 0,
        data: {
          action: 'firebase_trigger_functions',
        },
        statusCode: {
          404: () => {
            alert('Page not found')
          },
        },
      }

      $.ajax(settings)
        .done((response) => {
          console.log({ response })
          $('#firebase-message').html(response)
          $('#firebase-message').show()
        })
        .fail((error) => {
          $('#firebase-error').text('Error sending request!')
          $('#firebase-error').show()
          console.error(error)
        })
    })
  })
})(jQuery)
