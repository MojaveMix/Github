import React from 'react'
import jsPDF from 'jspdf'
import { faFilePdf , faPrint} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Generate({target , withPara , art}) {
  const  generatePDF = () => {
      var doc = new jsPDF('p', 'pt' , 'a4');

      document.querySelector(`#${target}`).style.right = "30px"
      document.querySelector(`#${target}`).style.width = "5%"
      document.querySelector(`.${withPara}`).style.width = "560px"


      doc.html(document.querySelector(`#${target}`),{
        // document.querySelector(`#${target}`)
         callback : function(pdf){
            pdf.save('Article.pdf')
            document.querySelector(`.${withPara}`).style.width = "100%";
         }
         
      });

  
}
  return (
    <div>
        <button onClick={generatePDF}  className='btn btn-link' 
         style={{position : "absolute"  , top : "20px"  }}
        type="primary"  >
        <FontAwesomeIcon style={{ fontSize : "22px"  }} id='pdf' icon={faFilePdf} > </FontAwesomeIcon>
        </button>
    </div>
  )
}
