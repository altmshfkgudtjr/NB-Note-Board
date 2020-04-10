// Temporary Save Variable
let NB_te_temp_save = '';

// Enter
const NB_te_enter = ()=> {
    if (event.which != 13) return true;
    let selection = window.getSelection();
    let range = selection.getRangeAt(0);
    if (range.endContainer.tagName == 'BLOCKQUOTE' && range.endContainer.textContent == '') {
        document.execCommand('Outdent');
    }
}
// P SIZE
const NB_te_control_p = ()=> {
    let selection = window.getSelection();
    let range = selection.getRangeAt(0);
    if (selection.anchorNode.parentNode.id != 'NB_te_post_cont'
     && selection.anchorNode.parentNode.offsetParent.id != 'NB_te_post_cont') {
        return;
    }
    document.execCommand('formatBlock', false, 'div');
}
// H1 SIZE
const NB_te_control_h1 = ()=> {
	let selection = window.getSelection();
    if (selection.anchorNode == null) {
        return;
    }
    let range = selection.getRangeAt(0);
	if (selection.anchorNode.parentNode.id != 'NB_te_post_cont'
     && selection.anchorNode.parentNode.offsetParent.id != 'NB_te_post_cont') {
        return;
    }
    document.execCommand('formatBlock', false, 'h1');
}
// H2 SIZE
const NB_te_control_h2 = ()=> {
    let selection = window.getSelection();
    if (selection.anchorNode == null) {
        return;
    }
    let range = selection.getRangeAt(0);
    if (selection.anchorNode.parentNode.id != 'NB_te_post_cont'
     && selection.anchorNode.parentNode.offsetParent.id != 'NB_te_post_cont') {
        return;
    }
    document.execCommand('formatBlock', false, 'h2');
}
// H3 SIZE
const NB_te_control_h3 = ()=> {
    let selection = window.getSelection();
    if (selection.anchorNode == null) {
        return;
    }
    let range = selection.getRangeAt(0);
    if (selection.anchorNode.parentNode.id != 'NB_te_post_cont'
     && selection.anchorNode.parentNode.offsetParent.id != 'NB_te_post_cont') {
        return;
    }
    document.execCommand('formatBlock', false, 'h3');
}
// H4 SIZE
const NB_te_control_h4 = ()=> {
    let selection = window.getSelection();
    if (selection.anchorNode == null) {
        return;
    }
    let range = selection.getRangeAt(0);
    if (selection.anchorNode.parentNode.id != 'NB_te_post_cont'
     && selection.anchorNode.parentNode.offsetParent.id != 'NB_te_post_cont') {
        return;
    }
    document.execCommand('formatBlock', false, 'h4');
}
// BOLD STYLE
const NB_te_control_bold = ()=> {
    let selection = window.getSelection();
    if (selection.anchorNode == null) {
        return;
    }
    let range = selection.getRangeAt(0);
    if (selection.anchorNode.parentNode.id != 'NB_te_post_cont'
     && selection.anchorNode.parentNode.offsetParent.id != 'NB_te_post_cont') {
        return;
    }
    document.execCommand('bold');
}
// ITALIC STYLE
const NB_te_control_italic = ()=> {
    let selection = window.getSelection();
    if (selection.anchorNode == null) {
        return;
    }
    let range = selection.getRangeAt(0);
    if (selection.anchorNode.parentNode.id != 'NB_te_post_cont'
     && selection.anchorNode.parentNode.offsetParent.id != 'NB_te_post_cont') {
        return;
    }
    document.execCommand('italic');
}
// STRIKE STYLE
const NB_te_control_strike = ()=> {
    let selection = window.getSelection();
    if (selection.anchorNode == null) {
        return;
    }
    let range = selection.getRangeAt(0);
    if (selection.anchorNode.parentNode.id != 'NB_te_post_cont'
     && selection.anchorNode.parentNode.offsetParent.id != 'NB_te_post_cont') {
        return;
    }
    document.execCommand('StrikeThrough');
}
// BLOCKQUOTE
const NB_te_control_quote = ()=> {
    let selection = window.getSelection();
    if (selection.anchorNode == null) {
        return;
    }
    let range = selection.getRangeAt(0);
    if (selection.anchorNode.parentNode.id != 'NB_te_post_cont'
     && selection.anchorNode.parentNode.offsetParent.id != 'NB_te_post_cont') {
        return;
    }
    document.execCommand('insertParagraph');
    if (selection.modify != undefined) {
        selection.modify('move', 'backward', 'line');
        document.execCommand('formatBlock', false, 'blockquote');
    } else {
        let blockquote = document.createElement('blockquote');
        blockquote.setAttribute('contentEditable', 'true');
        selection.focusNode.before(blockquote);
        blockquote.focus();
        document.execCommand('formatBlock', false, 'div');
    }
}
// Linking
const NB_te_control_link = (eng=false)=> {
    let selection = window.getSelection();
    if (selection.anchorNode == null) {
        return;
    }
    let range = selection.getRangeAt(0);
    if (selection.anchorNode.parentNode.id != 'NB_te_post_cont'
     && selection.anchorNode.parentNode.offsetParent.id != 'NB_te_post_cont') {
        return;
    }
    // Create Link Content div
    let link_cont_div = document.createElement('div');
    link_cont_div.id = 'NB_te_create_link_cont';
    link_cont_div.classList.add("NB_link_input_cont", "noselect");
    link_cont_div.setAttribute('contentEditable', 'false');

    // Insert Link Title div
    let content_div = document.createElement('div');
    content_div.classList.add("NB_link_input_content");
    let content_div_text = document.createElement('span');
    let title_lang = '제목';
    if (eng) {
        title_lang = 'Title';
    }
    content_div_text.textContent = title_lang;
    let content_div_input = document.createElement('input');
    let ph = '제목을 입력해주세요.';
    if (eng) {
    	ph = 'Enter the link name.';
    }
    Object.assign(content_div_input, {
        'type': 'text', 
        'max': 50, 
        'placeholder': ph,
        'autocomplete': 'off'
    });
    content_div.append(content_div_text, content_div_input);
    link_cont_div.append(content_div);
    content_div_input.onblur = ()=> {     // Input Blur Eventbinding
        NB_te_remove_link();
    }

    // Insert Link URL div
    content_div = document.createElement('div');
    content_div.classList.add("NB_link_input_content");
    content_div_text = document.createElement('span');
    title_lang = '링크';
    if (eng) {
        title_lang = 'Link';
    }
    content_div_text.textContent = title_lang;
    content_div_input = document.createElement('input');
    ph = 'URL을 입력해주세요.';
    if (eng) {
    	ph = 'Enter the URL.';
    }
    Object.assign(content_div_input, {
        'type': 'text', 
        'max': 1000, 
        'placeholder': ph,
        'autocomplete': 'off'
    });
    content_div.append(content_div_text, content_div_input);
    link_cont_div.append(content_div);
    content_div_input.onblur = ()=> {       // Input Blur Eventbinding
        NB_te_remove_link();
    }

    let link_btn = document.createElement('div');
    link_btn.classList.add("NB_link_done_btn");
    let link_btn_lang = "확인";
    if (eng) {
    	link_btn_lang = "Create";
    }
    link_btn.textContent = link_btn_lang;
    link_cont_div.append(link_btn);
    link_btn.onclick = ()=> {             // Link Button Eventbinding
        NB_te_create_link(link_cont_div);
    }

    // Append div to DOM
    if (selection.modify != undefined)
        selection.modify('move', 'backward', 'line');
    if (selection.focusNode.parentNode.classList.contains('NB_link_btn')) {
        selection.focusNode.parentNode.parentNode.after(link_cont_div);
    } else if (selection.focusNode.nextSibling == null) {
        selection.focusNode.after(link_cont_div);
    } else {
        if (selection.modify != undefined)
            selection.modify('forward', false, 'line');
        selection.focusNode.nextSibling.append(link_cont_div);
    }
    document.querySelector('#NB_te_create_link_cont > .NB_link_input_content > input').focus();
}
// Link Container Check
const NB_te_remove_link = ()=> {
    let selection = window.getSelection();
    let range = selection.getRangeAt(0);
    for (let Node of document.querySelectorAll('.NB_link_input_cont')) {
        // Empty Link Container Remove!
        if (Node.querySelectorAll('input')[0].value == ''
            && Node.querySelectorAll('input')[1].value == '') {
            Node.remove();
        }
    }
}
// Link Making
const NB_te_create_link = (tag)=> {
    // Empty Value Checking
    for (let Node of tag.querySelectorAll('input')) {
        if (Node.value == "") {
            Node.focus();
            return false;
        } 
    }

    let title = tag.querySelectorAll('input')[0].value;
    let url = tag.querySelectorAll('input')[1].value;

    let link_cont_div = document.createElement('div');
    let link_cont = document.createElement('a');
    link_cont.textContent = title;
    link_cont.classList.add('NB_link_btn');
    Object.assign(link_cont, {'contentEditable': 'true','target': '_blank', 'href': url});
    link_cont_div.textContent = " ";
    link_cont_div.append(link_cont);

    tag.remove();
        let selection = window.getSelection();
    let range = selection.getRangeAt(0);
    let target = selection.anchorNode;

    while (target.id != 'NB_te_post_cont' && target.parentNode.id != 'NB_te_post_cont') {
        target = target.parentNode;
    }
    if (selection.modify != undefined)
        selection.modify('forward', false, 'line');

    if (target.id == 'NB_te_post_cont') {
        target.append(link_cont_div);
    } else if (target.tagName != undefined && target.querySelector('a')) {
        target.before(link_cont_div);
    } else if (target.childNodes[0] != undefined && target.childNodes[0].tagName == 'BR') {
        target.append(link_cont_div);
    } else {
        target.after(link_cont_div);
    }
    if (selection.modify != undefined)
        selection.modify('move', 'forward', 'paragraph');
}
// Image Insert
const NB_te_control_image = ()=> {
    let images = document.querySelector('#NB_te_control_image_content');
    let tempath = URL.createObjectURL(images.files[0]); // Create Temporary Image URL
    let selection = window.getSelection();

    console.log(tempath);
    console.log(images.files[0]);

    // Image Element Created!
    let img_cont = document.createElement('img');
    img_cont.classList.add('NB_img_cont');
    img_cont.setAttribute('src', tempath);
    selection.focusNode.after(img_cont);

    // 자원 낭비 방지를 위한 임시 코드
    // window.URL.revokeObjectURL(tempath);    // Rovoke Temporary Image URL
}

// New NBnote
const NBnote = (color='#12b886', link=true, image=true, eng=false)=> {
    this.newControlElement = (TagName)=> {
        let elem = document.createElement(TagName);
        elem.classList.add('NB_te_control_box');
        return elem;
    };
    this.newControlBreak = ()=> {
        let elem = document.createElement('div');
        elem.classList.add('NB_te_control_box_break');
        return elem;
    };
    // Color Setting
    document.querySelector('#NB-texteditor').style.setProperty('--NBnote-color', color);

    // Editor Whole Container ========================================
    let editor_cont = document.createElement('div');
    editor_cont.classList.add('NB_te_cont');

    // Editor Title Container ========================================
    let title_cont = document.createElement('div');
    title_cont.classList.add("NB_te_title_cont");
    let title_input = document.createElement('input');
    title_input.classList.add('NB_te_title_input');
    let titlePH = "제목을 입력해주세요.";
    if (eng) {
    	titlePH = "Enter your title.";
    }
    Object.assign(title_input, {
        'id': 'NB_te_title_input',
        'type': 'text',
        'placeholder': titlePH,
        'autocomplete': 'off'
    });
    title_cont.append(title_input);

    // Editor Controller Container ====================================
    let control_cont = document.createElement('div');
    control_cont.classList.add('NB_te_control_cont', 'NB_noselect');
    // P
    let control_element = this.newControlElement('div');
    control_element.id = 'NB_te_control_p';
    control_element.textContent = 'P';
    control_cont.append(control_element);
    control_element.onclick = ()=> {
        NB_te_control_p();
    };
    // H1
    control_element = this.newControlElement('div');
    control_element.id = 'NB_te_control_h1';
    control_element.textContent = 'H1';
    control_element.onclick = ()=> {
        NB_te_control_h1();
    };
    control_cont.append(control_element);
    
    // H2
    control_element = this.newControlElement('div');
    control_element.id = 'NB_te_control_h2';
    control_element.textContent = 'H2';
    control_element.onclick = ()=> {
        NB_te_control_h2();
    };
    control_cont.append(control_element);
    
    // H3
    control_element = this.newControlElement('div');
    control_element.id = 'NB_te_control_h3';
    control_element.textContent = 'H3';
    control_element.onclick = ()=> {
        NB_te_control_h3();
    };
    control_cont.append(control_element);
    
    // H4
    control_element = this.newControlElement('div');
    control_element.id = 'NB_te_control_h4';
    control_element.textContent = 'H4';
    control_element.onclick = ()=> {
        NB_te_control_h4();
    };
    control_cont.append(control_element);
    
    // Control Break
    control_cont.append(this.newControlBreak());
    // Bold
    control_element = this.newControlElement('div');
    control_element.id = 'NB_te_control_bold';
    control_element.textContent = 'B';
    control_element.onclick = ()=> {
        NB_te_control_bold();
    };
    control_cont.append(control_element);
    
    // Italic
    control_element = this.newControlElement('div');
    control_element.id = 'NB_te_control_italic';
    control_element.textContent = 'I';
    control_element.onclick = ()=> {
        NB_te_control_italic();
    };
    control_cont.append(control_element);
    
    // Strike
    control_element = this.newControlElement('div');
    control_element.id = 'NB_te_control_strike';
    control_element.textContent = 'T';
    control_element.style.textDecoration = 'line-through';
    control_element.onclick = ()=> {
        NB_te_control_strike();
    };
    control_cont.append(control_element);
    
    // Control Break
    control_cont.append(this.newControlBreak());
    // BlockQuote
    control_element = this.newControlElement('div');
    control_element.id = 'NB_te_control_quote';
    control_element.textContent = '「 」';
    control_element.onclick = ()=> {
        NB_te_control_quote();
    };
    control_cont.append(control_element);
    
    // Link
    if (link) {
        control_element = this.newControlElement('div');
        control_element.id = 'NB_te_control_link';
        control_element.textContent = '∝';
        control_element.onclick = ()=> {
            NB_te_control_link(eng);
        };
        control_cont.append(control_element);
    }
    
    // Image
    if (image) {
        control_element = this.newControlElement('div');
        control_element.id = 'NB_te_control_image';

        let control_element_image = document.createElement('input');
        Object.assign(control_element_image, {
            'id': 'NB_te_control_image_content',
            'type': 'file'
        });
        control_element_image.accept = 'img/*';
        control_element_image.onchange = ()=> {
            NB_te_control_image();
        };
        control_element.append(control_element_image);
        control_element.append('⇧');
        control_element.onclick = ()=> {
            NB_te_control_image();
        };
        control_element.onclick = ()=> {
            let selection = window.getSelection();
            if (selection.anchorNode == null) {
                return;
            }
            let range = selection.getRangeAt(0);
            if (selection.anchorNode.parentNode.id != 'NB_te_post_cont'
             && selection.anchorNode.parentNode.offsetParent.id != 'NB_te_post_cont') {
                return;
            }
            document.querySelector('#NB_te_control_image_content').click();
        };
        control_cont.append(control_element);
    }

    // Editor Post Container ==========================================
    let post_cont = document.createElement('div');
    post_cont.id = "NB_te_post_cont";
    post_cont.classList.add('NB_te_post_cont');
    let postPH = "내용을 입력해주세요.";
    if (eng) {
    	postPH = "Enter your contents.";
    }
    post_cont.setAttribute('placeholder', postPH);
    Object.assign(post_cont, {
        'id': 'NB_te_post_cont',
        'contentEditable': 'true',
        'spellcheck': 'false'
    });
    post_cont.onkeypress = () => {
        NB_te_enter();
    };

    // Combination
    editor_cont.append(title_cont);
    editor_cont.append(control_cont);
    editor_cont.append(post_cont);

    document.querySelector('#NB-texteditor').append(editor_cont);
}

// Get Data : Return FormData!
const NBnoteData = (title=false, post=false, images=false)=> {
    let output = new FormData();
    
    // Get Title
    if (title) {
        let getTitle = document.querySelector('#NB_te_title_input').value.trim();
        if (getTitle == "") {
            document.querySelector('#NB_te_title_input').focus();
            return;
        }
        output.append('title', getTitle);
    }

    // Get Images
    if (images) {
        for (let img of NB_te_Img_files) {
            console.log(img);
            output.append('images', img, img['name']);
        }
    }

    // Get Post
    if (post) {
        let getPost = document.querySelector('#NB_te_post_cont').innerHTML.trim();
        if (getPost == "") {
            document.querySelector('#NB_te_post_cont').focus();
            return;
        }
        output.append('post', getPost);
    }

    return output;
}