
const getList = async () => {
    let url = 'http://127.0.0.1:5000/dados';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.dados.forEach(item => insertList(item.nome, item.meta_glicemica_dia, item.meta_glicemica_noite, item.fator_sensibilidade, item.rc_cafe,
                            item.rc_almoco, item.rc_lanche, item.rc_janta, item.hgt_90, item.hgt_70, item.glicose, item.carboidratos, item.calculo, item.retorno))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

getList()

const postItem = async (inputNome, inputMetaGlicemicaDia, inputMetaGlicemicaNoite, inputFatorSensibilidade, inputRcCafe, inputRcAlmoco, inputRcLanche,
                        inputRcJanta, inputHgt90, inputHgt70, inputGlicose, inputCarboidratos, inputCalculo, retorno) => {
    const formData = new FormData();
    formData.append('nome', inputNome);
    formData.append('meta_glicemica_dia', inputMetaGlicemicaDia);
    formData.append('meta_glicemica_noite', inputMetaGlicemicaNoite);
    formData.append('fator_sensibilidade', inputFatorSensibilidade);
    formData.append('rc_cafe', inputRcCafe);
    formData.append('rc_almoco', inputRcAlmoco);
    formData.append('rc_lanche', inputRcLanche);
    formData.append('rc_janta', inputRcJanta);
    formData.append('hgt_90', inputHgt90);
    formData.append('hgt_70', inputHgt70);
    formData.append('glicose', inputGlicose);
    formData.append('carboidratos', inputCarboidratos);
    formData.append('calculo', inputCalculo);
    formData.append('retorno', retorno)
  
    let url = 'http://127.0.0.1:5000/dado';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
}

const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
}


const removeElement = () => {
    let close = document.getElementsByClassName("close");
    // var table = document.getElementById('myTable');
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const nomeItem = div.getElementsByTagName('td')[0].innerHTML
        if (confirm("Você tem certeza?")) {
          div.remove()
          deleteItem(nomeItem)
          alert("Removido!")
        }
      }
    }
}

const deleteItem = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/dado?nome=' + item;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
}

const newDados = () => {
    let inputNome = document.getElementById("newNome").value;
    let inputMetaGlicemicaDia = document.getElementById("newMetaGlicemicaDia").value;
    let inputMetaGlicemicaNoite = document.getElementById("newMetaGlicemicaNoite").value;
    let inputFatorSensibilidade = document.getElementById("newFatorSensibilidade").value;
    let inputRcCafe = document.getElementById("newRcCafe").value;
    let inputRcAlmoco = document.getElementById("newRcAlmoco").value;
    let inputRcLanche = document.getElementById("newRcLanche").value;
    let inputRcJanta = document.getElementById("newRcJanta").value;
    let inputHgt90 = document.getElementById("newHgt90").value;
    let inputHgt70 = document.getElementById("newHgt70").value;
    let inputGlicose = document.getElementById("newGlicose").value;
    let inputCarboidratos = document.getElementById("newCarboidratos").value;
    let inputCalculo = document.getElementById("newCalculo").value;
    let retorno = newDados.retorno;
  
    if (inputNome === '') {
      alert("Escreva o nome!");
    } else if (isNaN(inputMetaGlicemicaDia)) {
      alert("Valor precisa ser número!");
    } else {
      insertList(inputNome, inputMetaGlicemicaDia, inputMetaGlicemicaNoite, inputFatorSensibilidade, inputRcCafe, inputRcAlmoco, inputRcLanche,
                  inputRcJanta, inputHgt90, inputHgt70, inputGlicose, inputCarboidratos, inputCalculo, retorno)
      postItem(inputNome, inputMetaGlicemicaDia, inputMetaGlicemicaNoite, inputFatorSensibilidade, inputRcCafe, inputRcAlmoco, inputRcLanche,
                  inputRcJanta, inputHgt90, inputHgt70, inputGlicose, inputCarboidratos, inputCalculo, retorno)
      
      alert("Cálculo Realizado! Observe o resultado na última coluna da tabela abaixo..");
      window.location.reload();
    }
    
}

const insertList = (nome, meta_glicemica_dia, meta_glicemica_noite, fator_sensibilidade, rc_cafe, rc_almoco, rc_lanche, rc_janta,
                    hgt_90, hgt_70, glicose, carboidratos, calculo, retorno) => {
    var item = [nome, meta_glicemica_dia, meta_glicemica_noite, fator_sensibilidade, rc_cafe, rc_almoco, rc_lanche, rc_janta,
                hgt_90, hgt_70, glicose, carboidratos, calculo, retorno]
    var table = document.getElementById('myTable');
    var row = table.insertRow();
  
    for (var i = 0; i < item.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = item[i];
    }
    insertButton(row.insertCell(-1))
    document.getElementById("newNome").value = "";
    document.getElementById("newMetaGlicemicaDia").value = meta_glicemica_dia;
    document.getElementById("newMetaGlicemicaNoite").value = meta_glicemica_noite;
    document.getElementById("newFatorSensibilidade").value = fator_sensibilidade;
    document.getElementById("newRcCafe").value = rc_cafe;
    document.getElementById("newRcAlmoco").value = rc_almoco;
    document.getElementById("newRcLanche").value = rc_lanche;
    document.getElementById("newRcJanta").value = rc_janta;
    document.getElementById("newHgt90").value = hgt_90;
    document.getElementById("newHgt70").value = hgt_70;
  
    removeElement()
  }




