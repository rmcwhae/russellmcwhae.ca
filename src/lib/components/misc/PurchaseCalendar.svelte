<script>
    import RightChevron from '$lib/components/icons/RightChevron.svelte'
</script>

<form
    action="https://www.paypal.com/cgi-bin/webscr"
    method="post"
    target="_top"
>
    <input type="hidden" name="cmd" value="_s-xclick" />
    <input type="hidden" name="hosted_button_id" value="HQKP3FLVYQKTQ" />
    <button class="button" type="submit"
        >Purchase <span class="right">
            <RightChevron />
        </span></button
    >
    <img
        alt=""
        border="0"
        src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
        width="1"
        height="1"
    />
</form>

<style>
    button {
        display: inline-flex;
        align-items: center;
        border-color: var(--medium-grey);
        background-color: var(--light-grey);
        cursor: pointer;
    }
    button:hover {
        /* border-color: var(--high-contrast-color); */
    }
    .right {
        margin-left: var(--s-2);
    }
</style>
