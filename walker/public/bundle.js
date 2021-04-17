
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function xlink_attr(node, attribute, value) {
        node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.37.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/components/ui/Icon.svelte generated by Svelte v3.37.0 */

    const file$4 = "src/components/ui/Icon.svelte";

    function create_fragment$4(ctx) {
    	let svg;
    	let use;
    	let use_xlink_href_value;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			use = svg_element("use");
    			xlink_attr(use, "xlink:href", use_xlink_href_value = `/bundle.svg#${/*name*/ ctx[0]}`);
    			add_location(use, file$4, 5, 1, 69);
    			attr_dev(svg, "class", "inline-svg-icon svelte-12xj3l5");
    			add_location(svg, file$4, 4, 0, 38);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, use);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*name*/ 1 && use_xlink_href_value !== (use_xlink_href_value = `/bundle.svg#${/*name*/ ctx[0]}`)) {
    				xlink_attr(use, "xlink:href", use_xlink_href_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Icon", slots, []);
    	let { name } = $$props;
    	const writable_props = ["name"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Icon> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("name" in $$props) $$invalidate(0, name = $$props.name);
    	};

    	$$self.$capture_state = () => ({ name });

    	$$self.$inject_state = $$props => {
    		if ("name" in $$props) $$invalidate(0, name = $$props.name);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [name];
    }

    class Icon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { name: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Icon",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*name*/ ctx[0] === undefined && !("name" in props)) {
    			console.warn("<Icon> was created without expected prop 'name'");
    		}
    	}

    	get name() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/User.svelte generated by Svelte v3.37.0 */
    const file$3 = "src/components/User.svelte";

    function create_fragment$3(ctx) {
    	let div4;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let span0;
    	let t2;
    	let div1;
    	let span1;
    	let t4;
    	let span2;
    	let t6;
    	let div3;
    	let div2;
    	let icon;
    	let t7;
    	let span3;
    	let current;
    	icon = new Icon({ props: { name: "coins" }, $$inline: true });

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			span0 = element("span");
    			span0.textContent = "Ищенко Александр";
    			t2 = space();
    			div1 = element("div");
    			span1 = element("span");
    			span1.textContent = "Команда";
    			t4 = space();
    			span2 = element("span");
    			span2.textContent = "Синяя";
    			t6 = space();
    			div3 = element("div");
    			div2 = element("div");
    			create_component(icon.$$.fragment);
    			t7 = space();
    			span3 = element("span");
    			span3.textContent = "54";
    			if (img.src !== (img_src_value = "https://2.bp.blogspot.com/-SYZeEKXWltA/W_F8zblq64I/AAAAAAAABec/c9L0mbjGgcYoFfnD6V1Zpd6gK-VhxzSWwCLcBGAs/w1200-h630-p-k-no-nu/rect1313.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "svelte-1b0sx3n");
    			add_location(img, file$3, 6, 2, 89);
    			attr_dev(div0, "class", "picture svelte-1b0sx3n");
    			add_location(div0, file$3, 5, 1, 65);
    			attr_dev(span0, "class", "name");
    			add_location(span0, file$3, 12, 1, 266);
    			add_location(span1, file$3, 15, 2, 332);
    			add_location(span2, file$3, 16, 2, 355);
    			attr_dev(div1, "class", "team");
    			add_location(div1, file$3, 14, 1, 311);
    			attr_dev(div2, "class", "count");
    			add_location(div2, file$3, 20, 2, 406);
    			add_location(span3, file$3, 24, 2, 463);
    			attr_dev(div3, "class", "coins");
    			add_location(div3, file$3, 19, 1, 384);
    			add_location(div4, file$3, 4, 0, 58);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div0);
    			append_dev(div0, img);
    			append_dev(div4, t0);
    			append_dev(div4, span0);
    			append_dev(div4, t2);
    			append_dev(div4, div1);
    			append_dev(div1, span1);
    			append_dev(div1, t4);
    			append_dev(div1, span2);
    			append_dev(div4, t6);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			mount_component(icon, div2, null);
    			append_dev(div3, t7);
    			append_dev(div3, span3);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			destroy_component(icon);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("User", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<User> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Icon });
    	return [];
    }

    class User extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "User",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/components/Header.svelte generated by Svelte v3.37.0 */
    const file$2 = "src/components/Header.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i].icon;
    	child_ctx[4] = list[i].label;
    	return child_ctx;
    }

    // (19:2) {#each headers as { icon, label }}
    function create_each_block(ctx) {
    	let div;
    	let icon;
    	let t0;
    	let span;
    	let t1_value = /*label*/ ctx[4] + "";
    	let t1;
    	let t2;
    	let current;
    	let mounted;
    	let dispose;

    	icon = new Icon({
    			props: { name: /*icon*/ ctx[3] },
    			$$inline: true
    		});

    	function click_handler() {
    		return /*click_handler*/ ctx[2](/*icon*/ ctx[3]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(icon.$$.fragment);
    			t0 = space();
    			span = element("span");
    			t1 = text(t1_value);
    			t2 = space();
    			attr_dev(span, "class", "svelte-67naci");
    			add_location(span, file$2, 27, 4, 552);
    			attr_dev(div, "class", "item " + /*icon*/ ctx[3] + " svelte-67naci");
    			toggle_class(div, "active", /*active*/ ctx[0] === /*icon*/ ctx[3]);
    			add_location(div, file$2, 19, 3, 405);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(icon, div, null);
    			append_dev(div, t0);
    			append_dev(div, span);
    			append_dev(span, t1);
    			append_dev(div, t2);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div, "click", click_handler, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*active, headers*/ 3) {
    				toggle_class(div, "active", /*active*/ ctx[0] === /*icon*/ ctx[3]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(icon);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(19:2) {#each headers as { icon, label }}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div1;
    	let user;
    	let t;
    	let div0;
    	let current;
    	user = new User({ $$inline: true });
    	let each_value = /*headers*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(user.$$.fragment);
    			t = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "items svelte-67naci");
    			add_location(div0, file$2, 17, 1, 345);
    			attr_dev(div1, "class", "header svelte-67naci");
    			add_location(div1, file$2, 14, 0, 312);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			mount_component(user, div1, null);
    			append_dev(div1, t);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*headers, active*/ 3) {
    				each_value = /*headers*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div0, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(user.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(user.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(user);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Header", slots, []);
    	let { active = "map" } = $$props;

    	const headers = [
    		{ icon: "map", label: "Карта" },
    		{ icon: "collection", label: "Коллекция" },
    		{ icon: "bag", label: "Инвентарь" },
    		{ icon: "achivment", label: "Достижения" }
    	];

    	const writable_props = ["active"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	const click_handler = icon => {
    		$$invalidate(0, active = icon);
    	};

    	$$self.$$set = $$props => {
    		if ("active" in $$props) $$invalidate(0, active = $$props.active);
    	};

    	$$self.$capture_state = () => ({ Icon, User, active, headers });

    	$$self.$inject_state = $$props => {
    		if ("active" in $$props) $$invalidate(0, active = $$props.active);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [active, headers, click_handler];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { active: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get active() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set active(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Dice.svelte generated by Svelte v3.37.0 */

    const file$1 = "src/components/Dice.svelte";

    function create_fragment$1(ctx) {
    	let div;
    	let ol;
    	let li0;
    	let span0;
    	let t0;
    	let li1;
    	let span1;
    	let t1;
    	let span2;
    	let t2;
    	let li2;
    	let span3;
    	let t3;
    	let span4;
    	let t4;
    	let span5;
    	let t5;
    	let li3;
    	let span6;
    	let t6;
    	let span7;
    	let t7;
    	let span8;
    	let t8;
    	let span9;
    	let t9;
    	let li4;
    	let span10;
    	let t10;
    	let span11;
    	let t11;
    	let span12;
    	let t12;
    	let span13;
    	let t13;
    	let span14;
    	let t14;
    	let li5;
    	let span15;
    	let t15;
    	let span16;
    	let t16;
    	let span17;
    	let t17;
    	let span18;
    	let t18;
    	let span19;
    	let t19;
    	let span20;
    	let t20;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			ol = element("ol");
    			li0 = element("li");
    			span0 = element("span");
    			t0 = space();
    			li1 = element("li");
    			span1 = element("span");
    			t1 = space();
    			span2 = element("span");
    			t2 = space();
    			li2 = element("li");
    			span3 = element("span");
    			t3 = space();
    			span4 = element("span");
    			t4 = space();
    			span5 = element("span");
    			t5 = space();
    			li3 = element("li");
    			span6 = element("span");
    			t6 = space();
    			span7 = element("span");
    			t7 = space();
    			span8 = element("span");
    			t8 = space();
    			span9 = element("span");
    			t9 = space();
    			li4 = element("li");
    			span10 = element("span");
    			t10 = space();
    			span11 = element("span");
    			t11 = space();
    			span12 = element("span");
    			t12 = space();
    			span13 = element("span");
    			t13 = space();
    			span14 = element("span");
    			t14 = space();
    			li5 = element("li");
    			span15 = element("span");
    			t15 = space();
    			span16 = element("span");
    			t16 = space();
    			span17 = element("span");
    			t17 = space();
    			span18 = element("span");
    			t18 = space();
    			span19 = element("span");
    			t19 = space();
    			span20 = element("span");
    			t20 = space();
    			button = element("button");
    			button.textContent = "Вращать";
    			attr_dev(span0, "class", "dot svelte-14zrlfb");
    			add_location(span0, file$1, 23, 3, 512);
    			attr_dev(li0, "class", "die-item svelte-14zrlfb");
    			attr_dev(li0, "data-side", "1");
    			add_location(li0, file$1, 22, 2, 473);
    			attr_dev(span1, "class", "dot svelte-14zrlfb");
    			add_location(span1, file$1, 26, 3, 582);
    			attr_dev(span2, "class", "dot svelte-14zrlfb");
    			add_location(span2, file$1, 27, 3, 606);
    			attr_dev(li1, "class", "die-item svelte-14zrlfb");
    			attr_dev(li1, "data-side", "2");
    			add_location(li1, file$1, 25, 2, 543);
    			attr_dev(span3, "class", "dot svelte-14zrlfb");
    			add_location(span3, file$1, 30, 3, 676);
    			attr_dev(span4, "class", "dot svelte-14zrlfb");
    			add_location(span4, file$1, 31, 3, 700);
    			attr_dev(span5, "class", "dot svelte-14zrlfb");
    			add_location(span5, file$1, 32, 3, 724);
    			attr_dev(li2, "class", "die-item svelte-14zrlfb");
    			attr_dev(li2, "data-side", "3");
    			add_location(li2, file$1, 29, 2, 637);
    			attr_dev(span6, "class", "dot svelte-14zrlfb");
    			add_location(span6, file$1, 35, 3, 794);
    			attr_dev(span7, "class", "dot svelte-14zrlfb");
    			add_location(span7, file$1, 36, 3, 818);
    			attr_dev(span8, "class", "dot svelte-14zrlfb");
    			add_location(span8, file$1, 37, 3, 842);
    			attr_dev(span9, "class", "dot svelte-14zrlfb");
    			add_location(span9, file$1, 38, 3, 866);
    			attr_dev(li3, "class", "die-item svelte-14zrlfb");
    			attr_dev(li3, "data-side", "4");
    			add_location(li3, file$1, 34, 2, 755);
    			attr_dev(span10, "class", "dot svelte-14zrlfb");
    			add_location(span10, file$1, 41, 3, 936);
    			attr_dev(span11, "class", "dot svelte-14zrlfb");
    			add_location(span11, file$1, 42, 3, 960);
    			attr_dev(span12, "class", "dot svelte-14zrlfb");
    			add_location(span12, file$1, 43, 3, 984);
    			attr_dev(span13, "class", "dot svelte-14zrlfb");
    			add_location(span13, file$1, 44, 3, 1008);
    			attr_dev(span14, "class", "dot svelte-14zrlfb");
    			add_location(span14, file$1, 45, 3, 1032);
    			attr_dev(li4, "class", "die-item svelte-14zrlfb");
    			attr_dev(li4, "data-side", "5");
    			add_location(li4, file$1, 40, 2, 897);
    			attr_dev(span15, "class", "dot svelte-14zrlfb");
    			add_location(span15, file$1, 48, 3, 1102);
    			attr_dev(span16, "class", "dot svelte-14zrlfb");
    			add_location(span16, file$1, 49, 3, 1126);
    			attr_dev(span17, "class", "dot svelte-14zrlfb");
    			add_location(span17, file$1, 50, 3, 1150);
    			attr_dev(span18, "class", "dot svelte-14zrlfb");
    			add_location(span18, file$1, 51, 3, 1174);
    			attr_dev(span19, "class", "dot svelte-14zrlfb");
    			add_location(span19, file$1, 52, 3, 1198);
    			attr_dev(span20, "class", "dot svelte-14zrlfb");
    			add_location(span20, file$1, 53, 3, 1222);
    			attr_dev(li5, "class", "die-item svelte-14zrlfb");
    			attr_dev(li5, "data-side", "6");
    			add_location(li5, file$1, 47, 2, 1063);
    			attr_dev(ol, "class", "die-list roll svelte-14zrlfb");
    			add_location(ol, file$1, 21, 1, 444);
    			attr_dev(button, "class", "svelte-14zrlfb");
    			add_location(button, file$1, 57, 1, 1260);
    			attr_dev(div, "class", "dice svelte-14zrlfb");
    			add_location(div, file$1, 20, 0, 424);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, ol);
    			append_dev(ol, li0);
    			append_dev(li0, span0);
    			append_dev(ol, t0);
    			append_dev(ol, li1);
    			append_dev(li1, span1);
    			append_dev(li1, t1);
    			append_dev(li1, span2);
    			append_dev(ol, t2);
    			append_dev(ol, li2);
    			append_dev(li2, span3);
    			append_dev(li2, t3);
    			append_dev(li2, span4);
    			append_dev(li2, t4);
    			append_dev(li2, span5);
    			append_dev(ol, t5);
    			append_dev(ol, li3);
    			append_dev(li3, span6);
    			append_dev(li3, t6);
    			append_dev(li3, span7);
    			append_dev(li3, t7);
    			append_dev(li3, span8);
    			append_dev(li3, t8);
    			append_dev(li3, span9);
    			append_dev(ol, t9);
    			append_dev(ol, li4);
    			append_dev(li4, span10);
    			append_dev(li4, t10);
    			append_dev(li4, span11);
    			append_dev(li4, t11);
    			append_dev(li4, span12);
    			append_dev(li4, t12);
    			append_dev(li4, span13);
    			append_dev(li4, t13);
    			append_dev(li4, span14);
    			append_dev(ol, t14);
    			append_dev(ol, li5);
    			append_dev(li5, span15);
    			append_dev(li5, t15);
    			append_dev(li5, span16);
    			append_dev(li5, t16);
    			append_dev(li5, span17);
    			append_dev(li5, t17);
    			append_dev(li5, span18);
    			append_dev(li5, t18);
    			append_dev(li5, span19);
    			append_dev(li5, t19);
    			append_dev(li5, span20);
    			append_dev(div, t20);
    			append_dev(div, button);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", rollDice, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function rollDice() {
    	const dice = [...document.querySelectorAll(".die-list")];

    	dice.forEach(die => {
    		toggleClasses(die);
    		die.dataset.roll = getRandomNumber(1, 6);
    	});
    }

    function toggleClasses(die) {
    	die.classList.toggle("roll");
    }

    function getRandomNumber(min, max) {
    	min = Math.ceil(min);
    	max = Math.floor(max);
    	return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Dice", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Dice> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ rollDice, toggleClasses, getRandomNumber });
    	return [];
    }

    class Dice extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Dice",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.37.0 */
    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let link0;
    	let link1;
    	let t0;
    	let main;
    	let header;
    	let t1;
    	let dice;
    	let current;

    	header = new Header({
    			props: { active: /*active*/ ctx[0] },
    			$$inline: true
    		});

    	dice = new Dice({ $$inline: true });

    	const block = {
    		c: function create() {
    			link0 = element("link");
    			link1 = element("link");
    			t0 = space();
    			main = element("main");
    			create_component(header.$$.fragment);
    			t1 = space();
    			create_component(dice.$$.fragment);
    			attr_dev(link0, "rel", "preconnect");
    			attr_dev(link0, "href", "https://fonts.gstatic.com");
    			add_location(link0, file, 8, 1, 153);
    			attr_dev(link1, "href", "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap");
    			attr_dev(link1, "rel", "stylesheet");
    			add_location(link1, file, 9, 1, 213);
    			attr_dev(main, "class", "svelte-z0uk09");
    			add_location(main, file, 15, 0, 349);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, link0);
    			append_dev(document.head, link1);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			mount_component(header, main, null);
    			append_dev(main, t1);
    			mount_component(dice, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(dice.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(dice.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			detach_dev(link0);
    			detach_dev(link1);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    			destroy_component(header);
    			destroy_component(dice);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	let active = "map";
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Header, Dice, active });

    	$$self.$inject_state = $$props => {
    		if ("active" in $$props) $$invalidate(0, active = $$props.active);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [active];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    window.initWalker = (props) => {
    	return new App({
    		target: document.querySelector("#walker"),
    		props
    	});
    };

    window.initWalker();

}());
//# sourceMappingURL=bundle.js.map
