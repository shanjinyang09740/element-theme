<script>
export default {
  functional: true,
  name: "item",
  render(h, context) {
    return (
      <div class="red" {...context.data}>
        {context.props.data}
      </div>
    );
  },
};
</script>
