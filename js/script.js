function ativaModal(){
  const elementLateral = document.querySelectorAll('[data-modal]');
  const elementoModal = document.querySelectorAll('[data-modal-abrir');
  elementLateral.forEach((modal,index)=>{
    modal.addEventListener('click',function(event){
      event.preventDefault();
      elementoModal[index].classList.add('ativo');
      const botaoFechar = document.querySelector(' .modal.ativo .btn');

      handleBtnFora.elementModal =  elementoModal[index];
      handleFora.elementModal =  elementoModal[index];
      botaoFechar.addEventListener('click',handleBtnFora);
      elementoModal[index].addEventListener('click', handleFora);
    });
  });
}
const handleBtnFora = {
  handleEvent:function(){
    this.elementModal.classList.remove('ativo');
  },
}
const handleFora = {
  handleEvent:function(e){
    if(e.target === this.elementModal)this.elementModal.classList.remove('ativo');
  },
}

ativaModal();


window.addEventListener('scroll',handleScroll);
const tamanhoTela = window.innerHeight  * 0.7;
const targetScroll = document.querySelectorAll('[data-scroll]');
function handleScroll(event){
    if(targetScroll){
      targetScroll.forEach((item)=>{
          const totalElement = item.getBoundingClientRect().top;
         if (totalElement < tamanhoTela){
           item.classList.add('ativo');
         }
      });
    }
}

const cep = document.querySelector('#cep');
cep.addEventListener('change',handlePreencher);
function handlePreencher(event){
  const valor = cep.value;
  const busca = fetch('https://viacep.com.br/ws/' + cep.value + '/json/');
  busca.then((response)=>{
    return response.json();
  }).then((response)=>{
    console.log(response);
    const formulario = document.querySelector('.form-cadastro');
    console.log(formulario.cidade);
    formulario.logradouro.value = response.logradouro; 
    formulario.bairo.value = response.bairro;
    formulario.cidade.value = response.localidade;
    formulario.uf.value = response.uf;
  });
}