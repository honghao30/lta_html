document.addEventListener("DOMContentLoaded", () => {

    const treeMenu = (containerId) => {
        if (!containerId) {
            return;
        }
    
        const container = document.querySelector(containerId);
        if (!container) {
            return;
        }
    
        const menuAll = container.querySelector('.all-tree');
        const oneDepth = container.querySelector('.two-depth-list')
        const twoDepthMenuButtons = container.querySelectorAll('.two-depth-button');
        const treeDepthMenuList = container.querySelectorAll('.tree-depth-list');
        const treeDepthMenus = container.querySelectorAll('.tree-depth-list li a');
        const depthTreeMenus = container.querySelectorAll('.depthmenu03 li a');
        console.log(menuAll, oneDepth)
        if (menuAll) {
            menuAll.addEventListener('click', () => {
                menuAll.classList.toggle('is-active');
                // twoDepthMenuButtons.forEach(button => {
                //     button.classList.toggle('is-active');
                // });
                oneDepth.classList.toggle('is-active');
                // treeDepthMenuList.forEach(list => {      
                //     list.classList.toggle('is-active');
                // });
            });
        }
    
        twoDepthMenuButtons.forEach(menu => {
            menu.addEventListener('click', (event) => {
                event.preventDefault();
                menu.classList.toggle('is-active');
                if (menu.parentElement.nextElementSibling) {
                    menu.parentElement.nextElementSibling.classList.toggle('is-active');
                }
            });
        });
    
        treeDepthMenus.forEach(menu => {
            menu.addEventListener('click', (event) => {
                event.preventDefault();
                const activeItem = container.querySelector('.tree-menu li.is-active');
                if (activeItem) {
                    activeItem.classList.remove('is-active');
                }
                menu.parentElement.classList.add('is-active');
                const selectData = menu.textContent;
                const lawContent = document.querySelector('.law-content .table_cont');
                if (lawContent) {
                    lawContent.setAttribute('data-name', selectData);
                }
            });
        });

        depthTreeMenus.forEach(menu => {
            menu.addEventListener('click', (event) => {
                event.preventDefault();
                menu.classList.toggle('is-active');
                if (menu.parentElement.nextElementSibling) {
                    menu.parentElement.nextElementSibling.classList.toggle('is-active');
                }
            });
        });        
    };
    
    treeMenu('#coverment');
    treeMenu('#law-list');
    

    // 탭
    // 탭메뉴
    function tabMenus(tabGroupSelector) {
        const tabGroup = document.querySelector(tabGroupSelector);
        if (!tabGroup) return; 

        const tabButtons = tabGroup.querySelectorAll('.tree-tab-head button');
        const tabPanes = tabGroup.querySelectorAll('.tree-menu');

        if (!tabButtons.length || !tabPanes.length) return; 

        tabButtons.forEach((button, index) => {
            button.addEventListener('click', event => {
                event.preventDefault();
                handleTabClick(index);
            });
        });

        function handleTabClick(index) {
            tabButtons.forEach(btn => btn.classList.remove('is-active'));
            tabButtons[index].classList.add('is-active');
            tabPanes.forEach(pane => pane.classList.remove('is-active'));
            tabPanes[index].classList.add('is-active');
        }
    }
    tabMenus('.law-tree-menu');

    const checkFormValLength = () => {
        const formEls = document.querySelectorAll('.has-text-count input[type="text"]');
    
        formEls.forEach(el => {
            const countVal = parseInt(el.value.length);
            const countEl = el.closest('.input-multi').querySelector('.input-text-count .current');
            if(countEl) {
                countEl.innerText = countVal;
            } 
        });
    
        formEls.forEach(el => {            
            el.addEventListener('input', event => {
                const countVal = parseInt(el.value.length);
                const countEl = el.closest('.input-multi').querySelector('.input-text-count .current');
                if(countEl) {
                    countEl.innerText = countVal; 
                }
                const total = parseInt(el.closest('.input-multi').querySelector('.input-text-count .total').textContent);
    
                if (countVal > total) {
                    el.value = el.value.substring(0, total);
                }               
            })         
        })
    }
    
    checkFormValLength();
    
    // 파일 첨부
    // 파일명 표시 기능
    const addFileNameListener = (fileInput) => {
        if (fileInput) { // fileInput 요소가 존재하는지 확인
            fileInput.addEventListener('change', () => {
                const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : '';
                const textInput = fileInput.closest('li').querySelector('.input-type input[type="text"]');
                if (textInput) {
                    textInput.value = fileName;
                }
            });
        }
    };

    // 파일 입력란 삭제 기능
    const addFileRemoveListener = (button) => {
        if (button) { // button 요소가 존재하는지 확인
            button.addEventListener('click', () => {
                button.closest('li').remove();
            });
        }
    };

    // 파일 입력란 추가 기능
    const addFileAddListener = (button) => {            
        if (button) { // button 요소가 존재하는지 확인
            button.addEventListener('click', () => {
                const newListItem = document.createElement('li');
                const m_newListItem = document.createElement('li');
                console.log(newListItem)

                if (fileListWrap[0].classList.value.includes('file-list-multi')) {
                    newListItem.innerHTML = `
                        <div class="input-wrap">
                            <input type="file" name="" class="file" style="width: 382px;"/>
                            <div class="form-element__wrap">
                                <div class="input-multi file-up">
                                    <span class="form-element__inner input-type" style="width: 272px; flex: none;">
                                        <input type="text" placeholder="파일을 선택해 주세요." title="파일첨부">
                                    </span>
                                    <button type="button" class="btn-border-gray">
                                        <i class="icon-file"></i>
                                        파일찾기
                                    </button>
                                    <button type="button" class="btn-dark-light file-remove">
                                        <i class="ico-minus"></i>
                                        삭제
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="form-element__wrap flex-row" style="margin-left: 87px;">
                            <div class="input-label">대체 텍스트</div>
                            <span class="form-element__inner input-type">
                            <input type="text" class="input-type1-font14" maxlength="" placeholder="내용을 입력해 주세요." title="대체텍스트">
                            </span>
                        </div>
                    `;
                } else {
                    newListItem.innerHTML = `
                        <input type="file" name="" class="file"  width: 70%; />
                        <div class="form-element__wrap">
                            <div class="input-multi file-up">
                                <span class="form-element__inner input-type">
                                    <input type="text" placeholder="" title="파일첨부">
                                </span>
                                <button type="button" class="btn-border-gray">
                                    <i class="icon-file"></i>
                                    파일찾기
                                </button>
                                <button type="button" class="btn-dark-light file-remove">
                                    <i class="ico-minus"></i>
                                    삭제
                                </button>

                            </div>
                        </div>
                    `;
                }

                if (fileListWrap[1] && fileListWrap[1].classList.contains('mo-file-list')) {
                    m_newListItem.innerHTML = `
                        <div class="input-wrap">
                            <input type="file" name="" class="file" style="width: 20%;" />
                            <div class="file-up">
                                <span class="form-element__inner input-type">
                                    <input type="text" placeholder="파일을 첨부해 주세요." title="파일첨부">
                                </span>
                                <button type="button" class="btn-delete file-remove">
                                    <i class="ico-minus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="input-wrap mt-16">
                            <div class="input-label">대체 텍스트</div>
                            <span class="form-element__inner input-type">
                                <input type="text" class="input-type1-font14" maxlength="" placeholder="내용을 입력해 주세요." title="대체텍스트">
                            </span>
                        </div>
                    `;
                }

                // fileListWrap[0]에 newListItem을 위쪽에 추가
                if (fileListWrap[0]) {
                    if (fileListWrap[0].firstChild) {
                        fileListWrap[0].insertBefore(newListItem, fileListWrap[0].firstChild);
                    } else {
                        fileListWrap[0].appendChild(newListItem);
                    }
                }

                // fileListWrap[1]에 m_newListItem을 위쪽에 추가
                if (fileListWrap[1]) {
                    if (fileListWrap[1].firstChild) {
                        fileListWrap[1].insertBefore(m_newListItem, fileListWrap[1].firstChild);
                    } else {
                        fileListWrap[1].appendChild(m_newListItem);
                    }
                }

                // 새로 추가된 파일 입력란과 버튼에 이벤트 리스너 추가
                const newFileInput = newListItem.querySelector('input[type="file"]');
                const m_newFileInput = m_newListItem.querySelector('input[type="file"]');
                addFileNameListener(newFileInput);
                addFileNameListener(m_newFileInput);

                const newAddButton = newListItem.querySelector('.btn-add');
                const m_newAddButton = m_newListItem.querySelector('.btn-add');
                addFileAddListener(newAddButton);
                addFileAddListener(m_newAddButton);

                const newRemoveButton = newListItem.querySelector('.file-remove');
                const m_newRemoveButton = m_newListItem.querySelector('.file-remove');
                addFileRemoveListener(newRemoveButton);
                addFileRemoveListener(m_newRemoveButton);
            });
        }
    };

    // 초기화 및 리스너 등록
    const fileListWrap = document.querySelectorAll('.file-list');
    const fileLists = document.querySelectorAll('.file-list li input[type=file]');
    fileLists.forEach(el => {
        addFileNameListener(el);
    });

    const fileAddButtons = document.querySelectorAll('.file-list li .btn-add, .mo-file-list li .btn-add');
    fileAddButtons.forEach(button => {
        addFileAddListener(button);
    });

    const fileRemoveButtons = document.querySelectorAll('.file-list li .file-remove');
    fileRemoveButtons.forEach(button => {
        addFileRemoveListener(button);
    });
    
    // 모바일 검색
    const toggleButtons = document.querySelector('.btn-detail-mo-toggle');
    toggleButtons && toggleButtons.addEventListener('click', () => {
        toggleButtons.innerText = toggleButtons.innerText === '상세조회 열기' ? '상세조회 닫기' : '상세조회 열기';
        document.querySelector('.mo-search-detail-content').classList.toggle('is-active');
    });
    
    //추가 버튼
    const dynamicAddList = (containerId, itemHTML) => {
        const listElement = document.querySelector(containerId);
    
        const handleAddClick = (itemHTML) => {
            const newListItem = document.createElement('li');
            newListItem.classList.add('input-wrap', 'flex-row');
            newListItem.innerHTML = itemHTML;
            listElement.insertBefore(newListItem, listElement.firstChild);
        };
    
        listElement.addEventListener('click', (e) => {
            if (e.target.closest('.btn-add')) {
                handleAddClick(itemHTML);
            }
    
            if (e.target.closest('.btn-delete')) {
                const listItem = e.target.closest('li');
                listItem.remove();
            }
        });
    };
    const govPartSelectHtml = `
        <div class="select_box" style="width: 408px;">
            <span class="select">선택하세요</span>
            <div class="option">
                <div class="mCustomScrollbar" data-mcs-theme="minimal-dark">
                    <ul>
                        <li>선택함1</li>
                        <li>선택함2</li>
                        <li>선택함3</li>
                    </ul>
                </div>
            </div>
        </div>  
        <button type="button" class="btn-dark-light btn-delete">
            <i class="ico-minus"></i> 삭제
        </button>                                                  
        <button type="button" class="btn-dark-light btn-add">
            <i class="ico-plus"></i> 추가
        </button>
    `;
    dynamicAddList('.dynamic_add-list', govPartSelectHtml);
    
    const yiYangPart = `
            <!-- 콤보박스 -->
            <div class="select_box" style="width: 188px;">
                <span class="select">국가</span>
                <div class="option">
                <div class="mCustomScrollbar" data-mcs-theme="minimal-dark">
                    <ul>
                    <li>선택함1</li>
                    <li>선택함2</li>
                    <li>선택함3</li>
                    </ul>
                </div>              
                </div>
            </div>
            →
            <!-- //콤보박스 -->      
            <!-- 콤보박스 -->
            <div class="select_box" style="width: 188px;">
                <span class="select">시군구</span>
                <div class="option">
                <div class="mCustomScrollbar" data-mcs-theme="minimal-dark">
                    <ul>
                    <li>선택함1</li>
                    <li>선택함2</li>
                    <li>선택함3</li>
                    </ul>
                </div>              
                </div>
            </div>
            <!-- //콤보박스 -->  
            <button type="button" class="btn-dark-light btn-delete">
                <i class="ico-minus"></i> 삭제
            </button>                                                                                    
            <button type="button" class="btn-dark-light btn-add">
                <i class="ico-plus"></i>
                추가
            </button>
    `;
    dynamicAddList('.dynamic_add-list2', yiYangPart);
    

});