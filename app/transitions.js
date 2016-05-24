export default function(){
  this.transition(
    this.fromRoute('items'),
    this.toRoute('item'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}