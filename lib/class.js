class drager{
	constructor() {
		this.curr_element = null,
		this.x_pos_element = 0,
		this.y_pos_element = 0;
		this.SessionData={
			'html': '',
            'imgArr': [],
            'txtValue': null
        };
	}
	
	start_drag(_this, e){
		this.curr_element = _this;
		let evt = e || window.event
		this.x_pos_element = evt.clientX - _this.offsetLeft;
		this.y_pos_element = evt.clientY - _this.offsetTop;
	}
	
	stop_drag() {
		this.curr_element = null;
	}
	
	while_drag(e){
		let evt = e || window.event;
		if(this.curr_element !== null){
			this.curr_element.style.left = (evt.clientX - this.x_pos_element) + 'px';
			this.curr_element.style.top = (evt.clientY - this.y_pos_element) + 'px';
		}
	}
}
