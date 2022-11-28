<template>
    <div>
    
        <div class="grid-container">
            <div class="grid-item">
                <div class="d-flex" style="justify-content: space-between;
    margin-left: 15px;
    margin-right: 14px;
    margin-top: 8px;">

               
                <div>fff</div>
                Today's Total Visitors
            </div>
            </div>
            <div class="grid-item">
                <div class="d-flex" style="justify-content: space-between;
    margin-left: 15px;
    margin-right: 14px;
    margin-top: 8px;">

               
                <div>fff</div>
                Current Active Users by Device Type
            </div>
            </div>
            <div class="grid-item">3</div>
            <div class="grid-item">Visitors Per Day</div>
            <div class="grid-item">Top Viewed Pages</div>
        </div>
    </div>
</template>
<script>
export default {
    data: () => {

    }
}
</script>

<style>
* {
    box-sizing: border-box;
}

.grid-container {
    margin: 50px auto;
    width: 98%;
    height: 100vh;
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-columns:  1fr;
    gap: 1em;
    grid-template-areas:
        'one one  two five five'
        'four four four five five'
}

.grid-item {
    border-radius: 1em;
    color: white;
}

.grid-item:nth-child(1) {
    grid-area: one;
    background-color: #222E50;
}

.grid-item:nth-child(2) {
    grid-area: two;
    background-color: #007991;
}


.grid-item:nth-child(4) {
    grid-area: four;
    background-color: #f6511d;
}

.grid-item:nth-child(5) {
    grid-area: five;
    background-color: #c1292e;
}


@media (max-width: 940px) {
    .grid-container {
        grid-template-areas:
            'one one two five five'
            'five five'
            'four four four four four'
    }
}

@media (max-width: 640px) {
    .grid-container {
        grid-template-areas:
            'one one two two two'
            ' five five'
            'four four four four four'
    }
}

@media (max-width: 900px) {
    .grid-container {
        grid-template-areas:
            'one'
            'two'
            'four'
            'five';
    }
}
</style>