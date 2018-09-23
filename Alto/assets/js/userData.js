// Post Request and format data to be put in table
function getRequest(urlString, data, title, id) {
    $.ajax({
      url: urlString,
      success: function (body) {
        var idDiv = '#id_def';
  
        if (pastID == 'none') { // first iteration 
          // change all of the attr of the elements
          $(idDiv).clone().attr("id", "id_" + id).insertAfter('#lay-'+id);
  
          $("#id_" + id).find("#title").attr("id", "title" + id); //change title id
          $("#id_" + id).find("#results").attr("id", "results" + id); //change results id
          $("#id_" + id).find("#getResults").attr("id", "getResults" + id);//change getResults id
        
          // generate the table
          var table = arrayToTable(data, { thead: true, attrs: { id: 'resultTab' + id, class: 'table table-dark table-hover table-striped  thead-light' } })
          $('#getResults' + id).append(table); 
          $('#id_'+id).appendTo('#lay-'+id)//add the table to the getResults area
          $('#title' + id).text(title) //change the title text
          $('#results'+id).css('display', 'block'); 
  
          pastID = id; // set the previous id to track
        } else { //changing pages or loading new data
            tableDiv(id)
            var table = arrayToTable(data, { thead: true, attrs: { id: 'resultTab' + id, class: 'table table-dark table-hover table-striped  thead-light' } })
            $('#getResults' + id).append(table); 
            $('#id_'+id).appendTo('#lay-'+id)//add the table to the getResults area
            $('#title' + id).text(title) //change the title text
            $('#results'+id).css('display', 'block'); 
            pastID = id;
          
        }
      },
      error: (err) => console.log("ERROR: " + JSON.stringify(err))
    });
  }
  
  function tableDiv(id) {
    console.log(pastID + ' tableDiv()')
            // change all of the attr of the elements
            $('#id_def').clone().attr("id", "id_" + id).insertAfter('#lay-'+id);
            $("#id_" + id).find("#title").attr("id", "title" + id); //change title id
            $("#id_" + id).find("#results").attr("id", "results" + id); //change results id
            $("#id_" + id).find("#getResults").attr("id", "getResults" + id);//change getResults id
            $("#id_" + id).css('display','block');
            $("#id_" + id).find(".imgBody").remove();//change getResults id
  
          }
  
  var arrayToTable = function (results, options = {}) {
    var header = [], format, data = [], counter = 0;
  
    $.each(results.split('" "'), function (index, item) {
      counter++;
      if (counter == 1) {
        header = item.split('","')
        header[0] = header[0].replace(/['"]+/g, '');
      } else {
        format = item.split('","')
        format.forEach(element => {
          data.push(element)
        });
      }
    });
  
    var table = $('<table "/>'),
      rows = [],
      row,
      i, j,
      defaults = {
        attrs: {} // attributes for the table element
      }
  
    options = $.extend(defaults, options);
    table.attr(options.attrs)
    var rowNum = 0;
  
    // loop through all the rows, we will deal with tfoot and thead later
    for (i = 0; i < (data.length / header.length) + 1; i++) {
      if (i == 0) {
        row = $('<tbody> <tr />');
      } else {
        row = $('<tr />');
      }
  
      for (j = 0; j < header.length; j++) {
        if (i == 0) {
          row.append($('<th scope="col"/>').html(header[j]));
  
        } else {
          row.append($('<td />').html(data[rowNum - (header.length)]));
        }
        rowNum++;
      }
      rows.push(row);
    }
    rows.push("</tbody>")
    // add all the rows
    table.append('<TableHeaderColumn dataField="any" dataFormat={indexN}>#</TableHeaderColumn>')
    for (i = 0; i < (data.length / header.length) + 1; i++) {
      table.append(rows[i]);
    };
    return table;
  }
  