export default function(){
  this.transition(
    this.fromRoute('items'),
    this.toRoute('item'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
   this.transition(
    this.fromRoute('items'),
    this.toRoute('groups'),
    this.use('crossFade'),
    this.reverse('crossFade')
  );
   this.transition(
    this.fromRoute('item'),
    this.toRoute('groups'),
    this.use('crossFade'),
    this.reverse('crossFade')
  );
  this.transition(
    this.fromRoute('groups'),
    this.toRoute('group'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
   this.transition(
    this.fromRoute('items'),
    this.toRoute('group'),
    this.use('crossFade'),
    this.reverse('crossFade')
  );
   this.transition(
    this.fromRoute('item'),
    this.toRoute('group'),
    this.use('crossFade'),
    this.reverse('crossFade')
  );
}